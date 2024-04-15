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
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMException;
import ai.picovoice.picollm.PicoLLMMatrixDimensions;

public class MainActivity extends AppCompatActivity {

    private final int PICOLLM_ITERATIONS = 10;
    private final String PICOLLM_FILE_NAME = "picollm-weights-4096x4096x256.bin";

    private final String PICOLLM_DOWNLOAD_URL = null; // define to stream remote model file

    private PicoLLM picollm;

    private File picollmFile;


    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private Future<?> backgroundTask;

    private Button startButton;
    private ProgressBar progressBar;
    private TextView progressText;

    @SuppressLint({"DefaultLocale", "SetTextI18n"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.picollm_activity_demo);

        startButton = findViewById(R.id.startButton);
        progressBar = findViewById(R.id.progressBar);
        progressText = findViewById(R.id.progressText);

        picollmFile = new File(getApplicationContext().getFilesDir(), PICOLLM_FILE_NAME);

        try {
            picollm = new PicoLLM.Builder().build();
        } catch (PicoLLMException e) {
            onPicoLLMError("PicoLLM init failed\n" + e.getMessage());
        }

        progressBar.setVisibility(View.VISIBLE);
        disableStartButton();

        if (PICOLLM_DOWNLOAD_URL != null) {
            backgroundTask = executor.submit(() -> {
                progressText.setText("Loading file from remote storage...");
                boolean isDownloadSuccessful = executeDownloadTask(PICOLLM_DOWNLOAD_URL, picollmFile);
                mainHandler.post(() -> {
                    if (isDownloadSuccessful) {
                        progressText.setText("Downloading complete!");
                        enableStartButton();
                        progressBar.setVisibility(View.INVISIBLE);
                    } else {
                        onPicoLLMError("Failed to download file");
                    }
                });
            });
        } else {
            progressText.setText("Loading file from local storage...");
            backgroundTask = executor.submit(() -> {
                try {
                    picollm.loadModelFile(picollmFile.getAbsolutePath());
                    progressText.setText("File loaded");
                    mainHandler.post(() -> {
                        enableStartButton();
                        progressBar.setVisibility(View.INVISIBLE);
                    });
                } catch (PicoLLMException e) {
                    mainHandler.post(() -> {
                        onPicoLLMError("Failed to load file from storage\n" + e.getMessage());
                    });
                }
            });
        }
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

    private void onPicoLLMError(String error) {
        disableStartButton();

        TextView errorMessage = findViewById(R.id.errorMessage);
        errorMessage.setText(error);
        errorMessage.setVisibility(View.VISIBLE);
    }

    private void disableStartButton() {
        startButton.setEnabled(false);
        startButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_disabled)
        );
    }

    private void enableStartButton() {
        startButton.setEnabled(true);
        startButton.setBackground(
                ContextCompat.getDrawable(this, R.drawable.button_background)
        );
    }

    @SuppressLint({"DefaultLocale", "SetTextI18n"})
    public void onClickStart(View view) {
        progressBar.setVisibility(View.VISIBLE);
        disableStartButton();
        progressText.setText("Running PICOLLM calculation...");

        backgroundTask = executor.submit(() -> {
            try {

                PicoLLMMatrixDimensions dimensions = picollm.getMatrixDimensions();

                float[] vector = new float[dimensions.getN()];
                for (int i = 0; i < vector.length; i++) {
                    vector[i] = (float) i;
                }

                final long startTime = System.currentTimeMillis();
                float[] result = picollm.chainMultiply(
                        vector,
                        PICOLLM_ITERATIONS);
                final double elapsedSeconds = (double)(System.currentTimeMillis() - startTime) / 1000;
                for (int i = 0; i < result.length; i++) {
                    Log.i("PICOVOICE", String.format("%d: %f", i, result[i]));
                }
                mainHandler.post(() -> {
                    progressBar.setVisibility(View.INVISIBLE);
                    enableStartButton();
                    progressText.setText(String.format("PicoLLM calculation completed in %.2f seconds", elapsedSeconds));
                });
            } catch (PicoLLMException e) {
                mainHandler.post(() -> {
                    onPicoLLMError("Chain multiply failed\n" + e.getMessage());
                });
            }
        });
    }


    @SuppressLint("DefaultLocale")
    private boolean executeDownloadTask(String srcUrl, File dstFile) {
        try {
            HttpURLConnection urlConnection = (HttpURLConnection) new URL(srcUrl).openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setDoOutput(false);
            urlConnection.connect();

            if (urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {

                InputStream inputStream = urlConnection.getInputStream();
                FileOutputStream outputStream = new FileOutputStream(dstFile);

                byte[] buffer = new byte[1024];
                int bytesRead;
                long total = 0;
                boolean isModelLoadComplete = false;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    total += bytesRead;

                    final long updateValue = total / 1024 / 1024;
                    mainHandler.post(() -> {
                        progressText.setText(String.format("Downloaded %d MB...", updateValue));
                    });
                    outputStream.write(buffer, 0, bytesRead);

                    isModelLoadComplete = picollm.loadModelChunk(buffer, bytesRead);
                }

                inputStream.close();
                outputStream.close();

                return isModelLoadComplete;
            } else {
                Log.e("PICOVOICE", String.format(
                        "File server responded with %d: %s",
                        urlConnection.getResponseCode(),
                        urlConnection.getResponseMessage())
                );
            }

            urlConnection.disconnect();

        } catch (Exception e) {
            Log.e("PICOVOICE", "Error: " + e);
        }

        return false;
    }
}
