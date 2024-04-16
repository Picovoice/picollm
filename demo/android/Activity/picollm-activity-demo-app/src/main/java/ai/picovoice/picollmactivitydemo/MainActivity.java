/*
    Copyright 2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/


package ai.picovoice.picollmactivitydemo;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.DocumentsContract;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMCompletion;
import ai.picovoice.picollm.PicoLLMException;
import ai.picovoice.picollm.PicoLLMStreamCallback;

public class MainActivity extends AppCompatActivity {

    private PicoLLM picollm;

    private Uri picollmModelUri;
    private File picollmModelFile;


    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private Future<?> backgroundTask;

    private EditText promptEditText;
    private Button uploadModelButton;
    private Button generateButton;
    private TextView completionText;

    @SuppressLint({"DefaultLocale", "SetTextI18n"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.picollm_activity_demo);

        promptEditText = findViewById(R.id.promptEditText);
        uploadModelButton = findViewById(R.id.uploadModelButton);
        generateButton = findViewById(R.id.generateButton);
        completionText = findViewById(R.id.completionText);

        uploadModelButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_background)
        );
        generateButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_background)
        );

        uploadModelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                modelSelection.launch(new String[]{"application/octet-stream"});
            }
        });

        generateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (picollm != null) {
                    try {
                        generatePicollm();
                    } catch (PicoLLMException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });
    }

    ActivityResultLauncher<String[]> modelSelection = registerForActivityResult(new ActivityResultContracts.OpenDocument(),
            new ActivityResultCallback<Uri>() {
                @Override
                public void onActivityResult(Uri uri) {
                    picollmModelUri = uri;

                    try {
                        completionText.setText("Loading model file...");
                        extractModelFile(picollmModelUri);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }

                    try {
                        loadPicollm();
                    } catch (PicoLLMException e) {
                        throw new RuntimeException(e);
                    }
                }
            });


    private void extractModelFile(Uri uri) throws IOException, FileNotFoundException {
        Log.i("PICOVOICE", "Copying model...");
        picollmModelFile = new File(getApplicationContext().getFilesDir(), "model.pllm");

        if (picollmModelFile.isFile()) {
            return;
        }

        InputStream is = new BufferedInputStream(getContentResolver().openInputStream(uri), 256);
        OutputStream os = new BufferedOutputStream(new FileOutputStream(picollmModelFile), 256);

        int numBytesRead;
        byte[] buffer = new byte[256];
        while ((numBytesRead = is.read(buffer)) != -1) {
            os.write(buffer, 0, numBytesRead);
        }

        os.flush();
        is.close();
        os.close();
    }

    private void loadPicollm() throws PicoLLMException {
        completionText.setText("Loading Picollm...");
        disableUploadModelButton();
        disableGenerateButton();

        backgroundTask = executor.submit(() -> {
            try {
                picollm = new PicoLLM.Builder()
                        .setModelPath(picollmModelFile.toString())
                        .build();
            } catch (PicoLLMException e) {
                throw new RuntimeException(e);
            }

            mainHandler.post(() -> {
                completionText.setText("Enter prompt!");
                enableGenerateButton();
            });
        });
    }

    class DemoStreamCallback implements PicoLLMStreamCallback {

        @Override
        public void callback(String completion) {
            Log.i("PICOVOICE", "Completion" + completion);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    completionText.setText(completionText.getText() + completion);
                }
            });
        }
    }

    private void generatePicollm() throws PicoLLMException {
        disableUploadModelButton();
        disableGenerateButton();

        backgroundTask = executor.submit(() -> {
            try {
                String prompt = promptEditText.getText().toString();

                completionText.setText(prompt);

                PicoLLMCompletion result = new PicoLLM.GenerateBuilder()
                        .setCompletionTokenLimit(20)
                        .setStreamCallback(new DemoStreamCallback())
                        .generate(picollm, prompt);
            } catch (PicoLLMException e) {
                throw new RuntimeException(e);
            }

            mainHandler.post(() -> {
                enableGenerateButton();
            });
        });
    }

    private void disableGenerateButton() {
        generateButton.setEnabled(false);
        generateButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_disabled)
        );
    }

    private void enableGenerateButton() {
        generateButton.setEnabled(true);
        generateButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_background)
        );
    }

    private void disableUploadModelButton() {
        uploadModelButton.setEnabled(false);
        uploadModelButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_disabled)
        );
    }

    private void enableUploadModelButton() {
        uploadModelButton.setEnabled(true);
        uploadModelButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_background)
        );
    }

//
//        picollmFile = new File(getApplicationContext().getFilesDir(), PICOLLM_FILE_NAME);
//
//        try {
//            picollm = new PicoLLM.Builder().build();
//        } catch (PicoLLMException e) {
//            onPicoLLMError("PicoLLM init failed\n" + e.getMessage());
//        }
//
//        progressBar.setVisibility(View.VISIBLE);
//        disableStartButton();
//
//        if (PICOLLM_DOWNLOAD_URL != null) {
//            backgroundTask = executor.submit(() -> {
//                progressText.setText("Loading file from remote storage...");
//                boolean isDownloadSuccessful = executeDownloadTask(PICOLLM_DOWNLOAD_URL, picollmFile);
//                mainHandler.post(() -> {
//                    if (isDownloadSuccessful) {
//                        progressText.setText("Downloading complete!");
//                        enableStartButton();
//                        progressBar.setVisibility(View.INVISIBLE);
//                    } else {
//                        onPicoLLMError("Failed to download file");
//                    }
//                });
//            });
//        } else {
//            progressText.setText("Loading file from local storage...");
//            backgroundTask = executor.submit(() -> {
//                try {
//                    picollm.loadModelFile(picollmFile.getAbsolutePath());
//                    progressText.setText("File loaded");
//                    mainHandler.post(() -> {
//                        enableStartButton();
//                        progressBar.setVisibility(View.INVISIBLE);
//                    });
//                } catch (PicoLLMException e) {
//                    mainHandler.post(() -> {
//                        onPicoLLMError("Failed to load file from storage\n" + e.getMessage());
//                    });
//                }
//            });
//        }
//    }

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

    private void onPicoLLMError(String error) {
        TextView errorMessage = findViewById(R.id.errorMessage);
        errorMessage.setText(error);
        errorMessage.setVisibility(View.VISIBLE);
    }

    @SuppressLint({"DefaultLocale", "SetTextI18n"})
    public void onClickStart(View view) {
//        progressBar.setVisibility(View.VISIBLE);
//        disableStartButton();
//        progressText.setText("Running PICOLLM calculation...");
//
//        backgroundTask = executor.submit(() -> {
//            try {
//
//                PicoLLMMatrixDimensions dimensions = picollm.getMatrixDimensions();
//
//                float[] vector = new float[dimensions.getN()];
//                for (int i = 0; i < vector.length; i++) {
//                    vector[i] = (float) i;
    }
}
