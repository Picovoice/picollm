/*
    Copyright 2024-2026 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollm.testapp;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import androidx.test.platform.app.InstrumentationRegistry;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.annotations.SerializedName;
import com.microsoft.appcenter.espresso.Factory;
import com.microsoft.appcenter.espresso.ReportHelper;

import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Rule;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.file.Files;

import ai.picovoice.picollm.PicoLLMCompletion;


public class BaseTest {

    @Rule
    public ReportHelper reportHelper = Factory.getReportHelper();

    static Context testContext;
    static Context appContext;
    static AssetManager assetManager;
    static File externalFilesDir;

    static String testResourcesPath;
    static String accessKey;
    static String modelPath;
    static String imageModelPath;
    static String embeddingModelPath;
    static String ocrModelPath;
    static String device;

    static JsonObject testData;

    static TestImage smallImage;

    protected static class CompletionExpectation {

        @SerializedName("num-prompt-tokens")
        private final int numPromptTokens;

        @SerializedName("num-completion-tokens")
        private final int numCompletionTokens;

        @SerializedName("endpoint")
        private final PicoLLMCompletion.Endpoint endpoint;

        @SerializedName("num-top-choices")
        private final int numTopChoices;

        @SerializedName("completion")
        private final String completion;

        public CompletionExpectation(
                int numPromptTokens,
                int numCompletionTokens,
                PicoLLMCompletion.Endpoint endpoint,
                int numTopChoices,
                String completion) {
            this.numPromptTokens = numPromptTokens;
            this.numCompletionTokens = numCompletionTokens;
            this.endpoint = endpoint;
            this.numTopChoices = numTopChoices;
            this.completion = completion;
        }

        public int getNumPromptTokens() {
            return numPromptTokens;
        }

        public int getNumCompletionTokens() {
            return numCompletionTokens;
        }

        public PicoLLMCompletion.Endpoint getEndpoint() {
            return endpoint;
        }

        public int getNumTopChoices() {
            return numTopChoices;
        }

        public String getCompletion() {
            return completion;
        }
    }

    @After
    public void TearDown() {
        reportHelper.label("Stopping App");
    }

    @BeforeClass
    public static void SetupClass() throws IOException {
        testContext = InstrumentationRegistry.getInstrumentation().getContext();
        appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        assetManager = testContext.getAssets();
        externalFilesDir = appContext.getExternalFilesDir("external");

        extractAssetsRecursively("test_resources", externalFilesDir);
        testResourcesPath = new File(
                externalFilesDir,
                "test_resources").getAbsolutePath();
        accessKey = appContext.getString(R.string.pvTestingAccessKey);
        modelPath = new File(
                externalFilesDir,
                appContext.getString(R.string.pvTestingModelName)).getAbsolutePath();
        imageModelPath = new File(
                externalFilesDir,
                appContext.getString(R.string.pvTestingImageModelName)).getAbsolutePath();
        embeddingModelPath = new File(
                externalFilesDir,
                appContext.getString(R.string.pvTestingEmbeddingModelName)).getAbsolutePath();
        ocrModelPath = new File(
                externalFilesDir,
                appContext.getString(R.string.pvTestingOcrModelName)).getAbsolutePath();
        device = appContext.getString(R.string.pvTestingDevice);
        testData = getTestData();
        smallImage = readImage("test_resources/test_image.png");
    }

    public static JsonObject getTestData() throws IOException {
        Context testContext = InstrumentationRegistry.getInstrumentation().getContext();
        AssetManager assetManager = testContext.getAssets();

        try (InputStream is = assetManager.open("test_resources/test_data.json");
                InputStreamReader reader = new InputStreamReader(is)) {
            return new JsonParser().parse(reader).getAsJsonObject();
        }
    }

    private static void extractAssetsRecursively(String path, File dst) throws IOException {
        String[] list = assetManager.list(path);
        if (list == null) {
            return;
        }

        if (list.length > 0) {
            File outputFile = new File(dst, path);
            if (!outputFile.exists()) {
                outputFile.mkdirs();
            }

            for (String file : list) {
                String filepath = path + "/" + file;
                extractAssetsRecursively(filepath, dst);
            }
        } else {
            extractFile(path);
        }
    }

    private static void extractFile(String filepath) throws IOException {
        try (InputStream is = assetManager.open(filepath);
                OutputStream os = new BufferedOutputStream(
                        Files.newOutputStream(new File(externalFilesDir, filepath).toPath()),
                        256)) {
            byte[] buffer = new byte[256];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        }
    }

    public static class TestImage {
        public final byte[] data;
        public final int width;
        public final int height;

        public TestImage(byte[] data, int width, int height) {
            this.data = data;
            this.width = width;
            this.height = height;
        }
    }

    public static TestImage readImage(String imagePath) throws IOException {
        Context testContext = InstrumentationRegistry.getInstrumentation().getContext();
        AssetManager assetManager = testContext.getAssets();

        InputStream is = assetManager.open(imagePath);
        Bitmap image = BitmapFactory.decodeStream(is);

        int width = image.getWidth();
        int height = image.getHeight();
        int imageDataSize = width * height;

        int[] imageDataARGB = new int[imageDataSize];
        image.getPixels(imageDataARGB, 0, width, 0, 0, width, height);

        byte[] imageDataRGB = new byte[imageDataSize * 3];

        int byteIndex = 0;
        for (int i = 0; i < imageDataSize; i++) {
            imageDataRGB[byteIndex++] = (byte) ((imageDataARGB[i] >> 16) & 0xFF);
            imageDataRGB[byteIndex++] = (byte) ((imageDataARGB[i] >> 8) & 0xFF);
            imageDataRGB[byteIndex++] = (byte) (imageDataARGB[i] & 0xFF);
        }

        return new TestImage(imageDataRGB, width, height);
    }
}
