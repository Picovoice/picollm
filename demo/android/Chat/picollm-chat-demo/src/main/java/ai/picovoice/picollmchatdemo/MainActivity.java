/*
    Copyright 2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollmchatdemo;

import android.annotation.SuppressLint;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;
import androidx.core.content.res.ResourcesCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMCompletion;
import ai.picovoice.picollm.PicoLLMDialog;
import ai.picovoice.picollm.PicoLLMException;
import ai.picovoice.picollm.PicoLLMGenerateParams;

public class MainActivity extends AppCompatActivity {

    private enum UIState {
        INIT,
        LOADING_MODEL,
        PROMPT,
        GENERATING_COMPLETION
    }

    private static final String ACCESS_KEY = "${YOUR_ACCESS_KEY_HERE}";

    private static final int COMPLETION_TOKEN_LIMIT = 256;

    private PicoLLM picollm;

    private PicoLLMDialog dialog;

    private PicoLLMCompletion finalCompletion;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private Future<?> backgroundTask;

    private ConstraintLayout loadModelLayout;
    private ConstraintLayout chatLayout;

    private Button loadModelButton;
    private TextView loadModelText;
    private ProgressBar loadModelProgress;

    private ImageButton promptButton;
    private EditText promptEditText;

    private TextView chatText;

    private ScrollView chatTextScrollView;

    private TextView chatStatusText;

    private ProgressBar chatStatusProgress;

    private ImageButton loadNewModelButton;

    private ImageButton clearTextButton;

    private SpannableStringBuilder chatTextBuilder;

    @SuppressLint({"DefaultLocale", "SetTextI18n"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_layout);

        loadModelLayout = findViewById(R.id.loadModelLayout);
        chatLayout = findViewById(R.id.chatLayout);

        loadModelText = findViewById(R.id.loadModelText);
        loadModelProgress = findViewById(R.id.loadModelProgress);
        loadModelButton = findViewById(R.id.loadModelButton);

        loadModelButton.setOnClickListener(view -> {
            modelSelection.launch(new String[]{"application/octet-stream"});
        });

        updateUIState(UIState.INIT);

        promptButton = findViewById(R.id.promptButton);
        promptButton.setOnClickListener(view -> generateCompletion());

        promptEditText = findViewById(R.id.promptEditText);
        promptEditText.setOnEditorActionListener((v, actionId, event) -> {
            if (actionId == EditorInfo.IME_ACTION_DONE) {
                promptButton.performClick();
                return true;
            }
            return false;
        });

        chatText = findViewById(R.id.chatText);
        chatTextScrollView = findViewById(R.id.chatScrollView);
        chatStatusText = findViewById(R.id.completionStatusText);
        chatStatusProgress = findViewById(R.id.completionStatusProgress);

        loadNewModelButton = findViewById(R.id.loadNewModelButton);
        loadNewModelButton.setOnClickListener(view -> {
            if (picollm != null) {
                picollm.delete();
                picollm = null;
            }
            updateUIState(UIState.INIT);
            mainHandler.post(() -> chatText.setText(""));
        });

        clearTextButton = findViewById(R.id.clearButton);
        clearTextButton.setOnClickListener(view -> {
            chatTextBuilder = new SpannableStringBuilder();
            mainHandler.post(() -> {
                chatText.setText("");
                clearTextButton.setEnabled(false);
                clearTextButton.setImageDrawable(
                        ResourcesCompat.getDrawable(getResources(),
                                R.drawable.clear_button_disabled,
                                null));
                chatStatusText.setText("");
            });

            try {
                dialog = picollm.getDialogBuilder().build();
            } catch (PicoLLMException e) {
                updateUIState(UIState.PROMPT);
                mainHandler.post(() -> chatText.setText(e.toString()));
            }
        });
    }

    ActivityResultLauncher<String[]> modelSelection = registerForActivityResult(
            new ActivityResultContracts.OpenDocument(),
            new ActivityResultCallback<Uri>() {
                @SuppressLint("SetTextI18n")
                @Override
                public void onActivityResult(Uri selectedUri) {
                    updateUIState(UIState.LOADING_MODEL);

                    if (selectedUri == null) {
                        updateUIState(UIState.INIT);
                        mainHandler.post(() -> loadModelText.setText("No file selected"));
                        return;
                    }

                    backgroundTask = executor.submit(() -> {
                        File modelFile = extractModelFile(selectedUri);
                        if (modelFile == null || !modelFile.exists()) {
                            updateUIState(UIState.INIT);
                            mainHandler.post(() -> loadModelText.setText("Unable to access selected file"));
                            return;
                        }

                        initPicoLLM(modelFile);
                    });
                }
            });

    private void initPicoLLM(File modelFile) {
        try {
            picollm = new PicoLLM.Builder()
                    .setAccessKey(ACCESS_KEY)
                    .setModelPath(modelFile.getAbsolutePath())
                    .build();
            dialog = picollm.getDialogBuilder().build();
        } catch (PicoLLMException e) {
            updateUIState(UIState.INIT);
            mainHandler.post(() -> loadModelText.setText(e.getMessage()));
            return;
        }

        chatTextBuilder = new SpannableStringBuilder();
        updateUIState(UIState.PROMPT);
    }

    private File extractModelFile(Uri uri) {
        File modelFile = new File(getApplicationContext().getFilesDir(), "model.pllm");

        try (InputStream is = getContentResolver().openInputStream(uri);
                OutputStream os = new FileOutputStream(modelFile)) {
            byte[] buffer = new byte[8192];
            int numBytesRead;
            while ((numBytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, numBytesRead);
            }
        } catch (IOException e) {
            return null;
        }

        return modelFile;
    }

    private void generateCompletion() {
        final String prompt = promptEditText.getText().toString().trim();
        if (prompt.length() == 0) {
            return;
        }

        updateUIState(UIState.GENERATING_COMPLETION);

        finalCompletion = null;

        mainHandler.post(() -> {
            int start = chatTextBuilder.length();
            chatTextBuilder.append("You:\n\n");
            int spanColour = ContextCompat.getColor(this, R.color.colorPrimary);
            chatTextBuilder.setSpan(
                    new ForegroundColorSpan(spanColour),
                    start,
                    start + 4,
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            chatTextBuilder.append(String.format("%s\n\n", prompt));

            start = chatTextBuilder.length();
            chatTextBuilder.append("picoLLM:\n\n");
            chatTextBuilder.setSpan(
                    new ForegroundColorSpan(spanColour),
                    start,
                    start + 8,
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
            chatText.setText(chatTextBuilder);
        });

        backgroundTask = executor.submit(() -> {
            try {
                dialog.addHumanRequest(prompt);
                finalCompletion = picollm.generate(
                        dialog.getPrompt(),
                        new PicoLLMGenerateParams.Builder()
                                .setStreamCallback(completion -> {
                                    runOnUiThread(() -> {
                                        chatTextBuilder.append(completion);
                                        chatText.setText(chatTextBuilder);
                                        chatTextScrollView.fullScroll(ScrollView.FOCUS_DOWN);
                                    });
                                })
                                .setCompletionTokenLimit(COMPLETION_TOKEN_LIMIT)
                                .build());
                dialog.addLLMResponse(finalCompletion.getCompletion());
                updateUIState(UIState.PROMPT);
                mainHandler.post(() -> {
                    clearTextButton.setEnabled(true);
                    clearTextButton.setImageDrawable(
                            ResourcesCompat.getDrawable(getResources(),
                                    R.drawable.clear_button,
                                    null));
                    chatTextBuilder.append("\n\n");
                });
            } catch (PicoLLMException e) {
                updateUIState(UIState.PROMPT);
                mainHandler.post(() -> chatText.setText(e.toString()));
            }
        });
    }

    private void updateUIState(UIState state) {
        mainHandler.post(() -> {
            switch (state) {
                case INIT:
                    loadModelLayout.setVisibility(View.VISIBLE);
                    chatLayout.setVisibility(View.INVISIBLE);
                    loadModelButton.setEnabled(true);
                    loadModelButton.setBackground(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.button_background,
                                    null));
                    loadModelProgress.setVisibility(View.INVISIBLE);
                    loadModelText.setText(getResources().getString(R.string.intro_text));
                    break;
                case LOADING_MODEL:
                    loadModelLayout.setVisibility(View.VISIBLE);
                    chatLayout.setVisibility(View.INVISIBLE);
                    loadModelButton.setEnabled(false);
                    loadModelButton.setBackground(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.button_disabled,
                                    null));
                    loadModelProgress.setVisibility(View.VISIBLE);
                    loadModelText.setText("Loading model...");
                    break;
                case PROMPT:
                    loadModelLayout.setVisibility(View.INVISIBLE);
                    chatLayout.setVisibility(View.VISIBLE);
                    promptEditText.setBackground(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.prompt_text_enabled,
                                    null));
                    promptEditText.setEnabled(true);
                    promptEditText.setText("");
                    promptButton.setBackground(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.prompt_button_enabled,
                                    null));
                    promptButton.setEnabled(true);
                    loadNewModelButton.setImageDrawable(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.arrow_back_button,
                                    null));
                    loadNewModelButton.setEnabled(true);
                    chatStatusProgress.setVisibility(View.GONE);
                    chatStatusText.setVisibility(View.VISIBLE);
                    chatStatusText.setText("");
                    clearTextButton.setEnabled(false);
                    clearTextButton.setImageDrawable(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.clear_button_disabled,
                                    null));
                    break;
                case GENERATING_COMPLETION:
                    loadModelLayout.setVisibility(View.INVISIBLE);
                    chatLayout.setVisibility(View.VISIBLE);
                    promptEditText.setBackground(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.prompt_text_disabled,
                                    null));
                    promptEditText.setEnabled(false);
                    promptButton.setBackground(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.prompt_button_disabled,
                                    null));
                    promptButton.setEnabled(false);
                    loadNewModelButton.setImageDrawable(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.arrow_back_button_disabled,
                                    null));
                    loadNewModelButton.setEnabled(false);
                    chatText.setText("");
                    chatStatusProgress.setVisibility(View.VISIBLE);
                    chatStatusText.setVisibility(View.VISIBLE);
                    chatStatusText.setText("Generating...");
                    clearTextButton.setEnabled(false);
                    clearTextButton.setImageDrawable(
                            ResourcesCompat.getDrawable(
                                    getResources(),
                                    R.drawable.clear_button_disabled,
                                    null));
                    break;
                default:
                    break;
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (executor != null) {
            executor.shutdownNow();
        }

        if (backgroundTask != null && !backgroundTask.isDone()) {
            backgroundTask.cancel(true);
        }
    }
}
