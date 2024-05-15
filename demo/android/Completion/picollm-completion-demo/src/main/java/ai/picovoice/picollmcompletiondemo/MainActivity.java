/*
    Copyright 2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollmcompletiondemo;

import android.annotation.SuppressLint;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;
import androidx.core.content.res.ResourcesCompat;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMCompletion;
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

    private PicoLLM picollm;

    private UIState currentAppState = UIState.INIT;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private Future<?> backgroundTask;

    private ConstraintLayout loadModelLayout;
    private ConstraintLayout completionLayout;

    private Button loadModelButton;
    private TextView loadModelText;
    private ProgressBar loadModelProgress;

    private ImageButton promptButton;
    private EditText promptEditText;

    private TextView completionText;

    private ScrollView completionTextScrollView;

    private TextView completionStatusText;

    private ProgressBar completionStatusProgress;

    private ImageButton loadNewModelButton;

    private SpannableStringBuilder completionTextBuilder;

    private PicoLLMCompletion detailedCompletion;

    private ImageButton showDetailedButton;

    private boolean showDetail;

    private long timerTick;
    private long timerTock;
    private int numTokens;

    public DrawerLayout drawerLayout;
    public ActionBarDrawerToggle actionBarDrawerToggle;

    private int completionTokenLimit = 64;
    private String[] stopPhrases = null;
    private float presencePenalty = 0;
    private float frequencyPenalty = 0;
    private float temperature = 0;
    private float topP = 1;
    private int numTopChoices = 0;

    @SuppressLint({"DefaultLocale", "SetTextI18n"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_layout);

        drawerLayout = findViewById(R.id.rootLayout);
        actionBarDrawerToggle = new ActionBarDrawerToggle(
                this,
                drawerLayout,
                R.string.settings_open,
                R.string.settings_close);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);
        drawerLayout.setDrawerLockMode(DrawerLayout.LOCK_MODE_LOCKED_CLOSED);

        loadModelLayout = findViewById(R.id.loadModelLayout);
        completionLayout = findViewById(R.id.completionLayout);

        bindSettingControls();

        loadModelText = findViewById(R.id.loadModelText);
        loadModelProgress = findViewById(R.id.loadModelProgress);
        loadModelButton = findViewById(R.id.loadModelButton);

        loadModelButton.setOnClickListener(view ->
                modelSelection.launch(new String[]{"application/octet-stream"})
        );

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

        completionText = findViewById(R.id.completionText);
        completionTextScrollView = findViewById(R.id.completionScrollView);
        completionStatusText = findViewById(R.id.completionStatusText);
        completionStatusProgress = findViewById(R.id.completionStatusProgress);

        loadNewModelButton = findViewById(R.id.loadNewModelButton);
        loadNewModelButton.setOnClickListener(view -> {
            if (picollm != null) {
                picollm.delete();
                picollm = null;
            }
            updateUIState(UIState.INIT);
            mainHandler.post(() -> completionText.setText(""));
        });

        showDetailedButton = findViewById(R.id.showDetailedButton);
        showDetailedButton.setOnClickListener(view -> {
            if (detailedCompletion == null) {
                return;
            }

            showDetail = !showDetail;
            showCompletion();
        });
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull final MenuItem item) {
        if (currentAppState == UIState.PROMPT && actionBarDrawerToggle.onOptionsItemSelected(item)) {
            if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
                drawerLayout.closeDrawer(GravityCompat.START);
            } else {
                drawerLayout.openDrawer(GravityCompat.START);
            }
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        actionBarDrawerToggle.syncState();
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

                        try {
                            picollm = new PicoLLM.Builder()
                                    .setAccessKey(ACCESS_KEY)
                                    .setModelPath(modelFile.getAbsolutePath())
                                    .build();
                        } catch (PicoLLMException e) {
                            updateUIState(UIState.INIT);
                            mainHandler.post(() -> loadModelText.setText(e.getMessage()));
                            return;
                        }

                        updateUIState(UIState.PROMPT);
                        mainHandler.post(() -> {
                            SeekBar completionTokenSlider = findViewById(R.id.completionTokenLimitSlider);
                            completionTokenSlider.setMax(picollm.getContextLength());
                            completionTokenLimit = Math.min(
                                    picollm.getContextLength(),
                                    completionTokenLimit);
                        });
                    });
                }
            });

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


    @SuppressLint("DefaultLocale")
    private void showCompletion() {
        mainHandler.post(() -> {
            double secondElapsed = (timerTock - timerTick) / 1e9;
            double tokensPerSecond = numTokens / secondElapsed;
            completionStatusText.setText(
                    String.format("%.2f tokens per second", tokensPerSecond)
            );

            showDetailedButton.setEnabled(true);
            showDetailedButton.setVisibility(View.VISIBLE);
            if (showDetail) {
                showDetailedButton.setImageDrawable(
                        ResourcesCompat.getDrawable(getResources(),
                                R.drawable.detailed_button_off,
                                null));
                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                completionText.setText(gson.toJson(detailedCompletion));
            } else {
                showDetailedButton.setImageDrawable(
                        ResourcesCompat.getDrawable(getResources(),
                                R.drawable.detailed_button_on,
                                null));
                completionText.setText(completionTextBuilder);
            }
        });
    }

    private void generateCompletion() {
        final String prompt = promptEditText.getText().toString().trim();
        if (prompt.length() == 0) {
            return;
        }

        updateUIState(UIState.GENERATING_COMPLETION);

        timerTick = timerTock = numTokens = 0;
        detailedCompletion = null;
        showDetail = false;

        mainHandler.post(() -> {
            completionTextBuilder = new SpannableStringBuilder(prompt);
            int spanColour = ContextCompat.getColor(this, R.color.colorPrimary);
            completionTextBuilder.setSpan(
                    new ForegroundColorSpan(spanColour),
                    0,
                    prompt.length(),
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
            completionText.setText(completionTextBuilder);
        });

        backgroundTask = executor.submit(() -> {
            try {
                detailedCompletion = picollm.generate(
                        prompt,
                        new PicoLLMGenerateParams.Builder()
                                .setCompletionTokenLimit(completionTokenLimit)
                                .setStopPhrases(stopPhrases)
                                .setPresencePenalty(presencePenalty)
                                .setFrequencyPenalty(frequencyPenalty)
                                .setTemperature(temperature)
                                .setTopP(topP)
                                .setNumTopChoices(numTopChoices)
                                .setStreamCallback(completion -> {
                                    runOnUiThread(() -> {
                                        completionTextBuilder.append(completion);
                                        completionText.setText(completionTextBuilder);
                                        completionTextScrollView.fullScroll(ScrollView.FOCUS_DOWN);
                                    });

                                    if (numTokens == 0) {
                                        timerTick = System.nanoTime();
                                    }

                                    timerTock = System.nanoTime();
                                    numTokens += 1;
                                })
                                .build());
                updateUIState(UIState.PROMPT);
                showCompletion();
            } catch (PicoLLMException e) {
                updateUIState(UIState.PROMPT);
                mainHandler.post(() -> completionText.setText(e.toString()));
            }
        });
    }

    private void updateUIState(UIState state) {
        mainHandler.post(() -> {
            switch (state) {
                case INIT:
                    loadModelLayout.setVisibility(View.VISIBLE);
                    completionLayout.setVisibility(View.INVISIBLE);
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
                    completionLayout.setVisibility(View.INVISIBLE);
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
                    completionLayout.setVisibility(View.VISIBLE);
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
                    completionStatusProgress.setVisibility(View.GONE);
                    completionStatusText.setVisibility(View.VISIBLE);
                    completionStatusText.setText("");
                    showDetailedButton.setEnabled(false);
                    showDetailedButton.setVisibility(View.INVISIBLE);
                    break;
                case GENERATING_COMPLETION:
                    loadModelLayout.setVisibility(View.INVISIBLE);
                    completionLayout.setVisibility(View.VISIBLE);
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
                    completionText.setText("");
                    completionStatusProgress.setVisibility(View.VISIBLE);
                    completionStatusText.setVisibility(View.VISIBLE);
                    completionStatusText.setText("Generating...");
                    showDetailedButton.setEnabled(false);
                    showDetailedButton.setVisibility(View.INVISIBLE);
                    break;
                default:
                    break;
            }

            currentAppState = state;
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

    private void bindSettingControls() {
        SeekBar temperatureSlider = findViewById(R.id.temperatureSlider);
        final TextView temperatureText = findViewById(R.id.temperatureText);

        temperatureSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float floatVal = progress / 100.f;
                temperature = floatVal;
                temperatureText.setText(String.valueOf(floatVal));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });

        SeekBar completionTokenLimitSlider = findViewById(R.id.completionTokenLimitSlider);
        final TextView completionTokenLimitText = findViewById(R.id.completionTokenLimitText);

        completionTokenLimitSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                completionTokenLimit = progress;
                completionTokenLimitText.setText(String.valueOf(progress));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });

        final EditText stopPhrasesEditText = findViewById(R.id.stopPhrasesEditText);
        stopPhrasesEditText.setOnFocusChangeListener((v, hasFocus) -> {
            if (!hasFocus) {
                String[] userInput = stopPhrasesEditText.getText().toString().trim().split(",");
                ArrayList<String> validStringsList = new ArrayList<>();
                for (String s : userInput) {
                    if (!s.isEmpty()) {
                        validStringsList.add(s);
                    }
                }

                stopPhrases = new String[validStringsList.size()];
                for (int i = 0; i < validStringsList.size(); i++) {
                    stopPhrases[i] = validStringsList.get(i);
                }
            }
        });

        SeekBar topPSlider = findViewById(R.id.topPSlider);
        final TextView topPText = findViewById(R.id.topPText);

        topPSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float floatVal = progress / 100.f;
                topP = floatVal;
                topPText.setText(String.valueOf(floatVal));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });

        SeekBar presencePenaltySlider = findViewById(R.id.presencePenaltySlider);
        final TextView presencePenaltyText = findViewById(R.id.presencePenaltyText);

        presencePenaltySlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float floatVal = progress / 100.f;
                presencePenalty = floatVal;
                presencePenaltyText.setText(String.valueOf(floatVal));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });


        SeekBar frequencyPenaltySlider = findViewById(R.id.frequencyPenaltySlider);
        final TextView frequencyPenaltyText = findViewById(R.id.frequencyPenaltyText);

        frequencyPenaltySlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float floatVal = progress / 100.f;
                frequencyPenalty = floatVal;
                frequencyPenaltyText.setText(String.valueOf(floatVal));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });

        SeekBar numTopChoicesSlider = findViewById(R.id.numTopChoicesSlider);
        numTopChoicesSlider.setMax(PicoLLM.getMaxTopChoices());

        final TextView numTopChoicesText = findViewById(R.id.numTopChoicesText);

        numTopChoicesSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                numTopChoices = progress;
                numTopChoicesText.setText(String.valueOf(progress));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });
    }
}
