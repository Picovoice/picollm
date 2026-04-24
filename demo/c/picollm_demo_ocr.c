/*
    Copyright 2026 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
    file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
    an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

#if !(defined(_WIN32) || defined(_WIN64))

#include <dlfcn.h>

#endif

#include <getopt.h>
#include <signal.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>

#if defined(_WIN32) || defined(_WIN64)

#include <windows.h>

#endif

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#include "pv_picollm.h"

static void *open_dl(const char *dl_path) {

#if defined(_WIN32) || defined(_WIN64)

    return LoadLibrary(dl_path);

#else

    return dlopen(dl_path, RTLD_NOW);

#endif
}

static void *load_symbol(void *handle, const char *symbol) {

#if defined(_WIN32) || defined(_WIN64)

    return GetProcAddress((HMODULE)handle, symbol);

#else

    return dlsym(handle, symbol);

#endif
}

static void close_dl(void *handle) {

#if defined(_WIN32) || defined(_WIN64)

    FreeLibrary((HMODULE)handle);

#else

    dlclose(handle);

#endif
}

static void print_dl_error(const char *message) {

#if defined(_WIN32) || defined(_WIN64)

    fprintf(stderr, "%s with code `%lu`.\n", message, GetLastError());

#else

    fprintf(stderr, "%s with `%s`.\n", message, dlerror());

#endif
}

static void (*pv_picollm_interrupt_func)(pv_picollm_t *) = NULL;
static pv_picollm_t *picollm = NULL;
static volatile bool is_interrupt = false;

void interrupt_handler(int _) {
    (void) _;
    is_interrupt = true;
    fprintf(stdout, "\n\nInterrupting generation...\n");
    pv_picollm_interrupt_func(picollm);
}

void print_error_message(
    char **message_stack,
    int32_t message_stack_depth,
    pv_status_t (*pv_get_error_stack_func)(char ***, int32_t *),
    void (*pv_free_error_stack_func)(char **),
    const char *(*pv_status_to_string_func)(pv_status_t)) {
    pv_status_t error_status = pv_get_error_stack_func(&message_stack, &message_stack_depth);
    if (error_status != PV_STATUS_SUCCESS) {
        fprintf(
                stderr,
                "Unable to get Picovoice error state with '%s'.\n",
                pv_status_to_string_func(error_status));
        exit(EXIT_FAILURE);
    }

    if (message_stack_depth > 0) {
        fprintf(stderr, ":\n");
        for (int32_t i = 0; i < message_stack_depth; i++) {
            fprintf(stderr, "  [%d] %s\n", i, message_stack[i]);
        }
    } else {
        fprintf(stderr, ".\n");
    }

    pv_free_error_stack_func(message_stack);
    exit(EXIT_FAILURE);
}

static void usage(const char *program) {
    (void) fprintf(
            stderr,
            "Usage: %s -a ACCESS_KEY -l LIBRARY_PATH -m MODEL_PATH "
            "[-y DEVICE] [-n MAX_OUTPUT_TOKENS] [-h] -i IMAGE_PATH\n"
            "-h: show available devices\n",
            program);
}

static const char *pv_picollm_endpoint_to_string(pv_picollm_endpoint_t x) {
    static const char *STRINGS[] = {
            "END_OF_SENTENCE",
            "COMPLETION_TOKEN_LIMIT_REACHED",
            "STOP_PHRASE_ENCOUNTERED",
            "INTERRUPTED"
    };

    return STRINGS[x];
}

static int32_t num_tokens = -1;
struct timeval tic;

static void completion_stream_callback(const char *token, void *context) {
    (void) context;
    if (!is_interrupt) {
        fprintf(stdout, "%s", token);
        fflush(stdout);
        if (num_tokens == -1) {
            gettimeofday(&tic, NULL);
        }
        num_tokens += 1;
    }
}

static void prompt_progress_callback(float progress, void *context) {
    (void) context;

    const int32_t BAR_WIDTH = 50;

    int32_t filled_len = (int32_t)((progress / 100.0f) * (float) BAR_WIDTH);

    fprintf(stdout, ("\r["));
    for (int32_t i = 0; i < BAR_WIDTH; i++) {
        if (i < filled_len) {
            fprintf(stdout, "#");
        } else {
            fprintf(stdout, " ");
        }
    }
    fprintf(stdout, "] %.1f%%", progress);
    fflush(stdout);

    if (progress >= 100.0f) {
        printf("\n");
    }
}

int picovoice_main(int argc, char **argv) {
    const char *SHORT_OPTIONS = "a:l:m:y:n:i:h";

    const char *access_key = NULL;
    const char *model_path = NULL;
    const char *library_path = NULL;
    const char *device_string = "best";
    int32_t max_output_tokens = -1;
    bool show_devices = false;
    const char *image_path = NULL;

    int opt;
    while ((opt = getopt(argc, argv, SHORT_OPTIONS)) != -1) {
        switch (opt) {
            case 'a':
                access_key = optarg;
                break;
            case 'm':
                model_path = optarg;
                break;
            case 'l':
                library_path = optarg;
                break;
            case 'n':
                max_output_tokens = (int32_t) strtol(optarg, NULL, 10);
                break;
            case 'i':
                image_path = optarg;
                break;
            case 'y':
                device_string = optarg;
                break;
            case 'h':
                show_devices = true;
                break;
            case '?':
                (void) fprintf(stderr, "Unknown option `%c`\n", optopt);
                usage(argv[0]);
                exit(EXIT_FAILURE);
            case ':':
                (void) fprintf(stderr, "Missing arg for `%c`\n", optopt);
                usage(argv[0]);
                exit(EXIT_FAILURE);
            default:
                break;
        }
    }

    if (!library_path) {
        usage(argv[0]);
        exit(EXIT_FAILURE);
    }

    void *dl_handle = open_dl(library_path);
    if (!dl_handle) {
        fprintf(stderr, "failed to load library at `%s`.\n", library_path);
        exit(EXIT_FAILURE);
    }

    const char *(*pv_status_to_string_func)(pv_status_t) = load_symbol(dl_handle, "pv_status_to_string");
    if (!pv_status_to_string_func) {
        print_dl_error("failed to load `pv_status_to_string`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_init_func)(const char *, const char *, const char *, pv_picollm_t **) =
        load_symbol(dl_handle, "pv_picollm_init");
    if (!pv_picollm_init_func) {
        print_dl_error("failed to load `pv_picollm_init`");
        exit(EXIT_FAILURE);
    }

    void (*pv_picollm_delete_func)(pv_picollm_t *) = load_symbol(dl_handle, "pv_picollm_delete");
    if (!pv_picollm_delete_func) {
        print_dl_error("failed to load `pv_picollm_delete`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_generate_ocr_func)(
            pv_picollm_t *,
            int32_t,
            int32_t,
            const uint8_t *,
            int32_t,
            pv_picollm_stream_callback_t,
            void *,
            pv_picollm_progress_callback_t,
            void *,
            pv_picollm_endpoint_t *,
            char **) = load_symbol(dl_handle, "pv_picollm_generate_ocr");
    if (!pv_picollm_generate_ocr_func) {
        print_dl_error("failed to load `pv_picollm_generate_ocr`");
        exit(EXIT_FAILURE);
    }

    pv_picollm_interrupt_func = load_symbol(dl_handle, "pv_picollm_interrupt");
    if (!pv_picollm_interrupt_func) {
        print_dl_error("failed to load `pv_picollm_interrupt`");
        exit(EXIT_FAILURE);
    }

    void (*pv_picollm_delete_completion_func)(char *) =
        load_symbol(dl_handle, "pv_picollm_delete_completion");
    if (!pv_picollm_delete_completion_func) {
        print_dl_error("failed to load `pv_picollm_delete_completion`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_context_length_func)(const pv_picollm_t *, int32_t *) =
        load_symbol(dl_handle, "pv_picollm_context_length");
    if (!pv_picollm_context_length_func) {
        print_dl_error("failed to load `pv_picollm_context_length`");
        exit(EXIT_FAILURE);
    }

    const char *(*pv_picollm_version_func)(void) =
        load_symbol(dl_handle, "pv_picollm_version");
    if (!pv_picollm_version_func) {
        print_dl_error("failed to load `pv_picollm_version`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_model_func)(pv_picollm_t *, char **) =
        load_symbol(dl_handle, "pv_picollm_model");
    if (!pv_picollm_model_func) {
        print_dl_error("failed to load `pv_picollm_model`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_list_hardware_devices_func)(char ***, int32_t *) =
        load_symbol(dl_handle, "pv_picollm_list_hardware_devices");
    if (!pv_picollm_list_hardware_devices_func) {
        print_dl_error("failed to load `pv_picollm_list_hardware_devices`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_free_hardware_devices_func)(char **, int32_t) =
        load_symbol(dl_handle, "pv_picollm_free_hardware_devices");
    if (!pv_picollm_free_hardware_devices_func) {
        print_dl_error("failed to load `pv_picollm_free_hardware_devices`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_get_error_stack_func)(char ***, int32_t *) =
        load_symbol(dl_handle, "pv_get_error_stack");
    if (!pv_get_error_stack_func) {
        print_dl_error("failed to load 'pv_get_error_stack_func'");
        exit(EXIT_FAILURE);
    }

    void (*pv_free_error_stack_func)(char **) =
        load_symbol(dl_handle, "pv_free_error_stack");
    if (!pv_free_error_stack_func) {
        print_dl_error("failed to load 'pv_free_error_stack_func'");
        exit(EXIT_FAILURE);
    }

    fprintf(stdout, "picoLLM v%s\n", pv_picollm_version_func());

    char **message_stack = NULL;
    int32_t message_stack_depth = 0;
    pv_status_t error_status = PV_STATUS_RUNTIME_ERROR;

    if (show_devices) {
        char **hardware_devices = NULL;
        int32_t num_hardware_devices = 0;
        pv_status_t status = pv_picollm_list_hardware_devices_func(&hardware_devices, &num_hardware_devices);
        if (status != PV_STATUS_SUCCESS) {
            fprintf(
                    stderr,
                    "Failed to list hardware devices with `%s`.\n",
                    pv_status_to_string_func(status));
            print_error_message(
                message_stack,
                message_stack_depth,
                pv_get_error_stack_func,
                pv_free_error_stack_func,
                pv_status_to_string_func
            );
        }

        for (int32_t i = 0; i < num_hardware_devices; i++) {
            fprintf(stdout, "%s\n", hardware_devices[i]);
        }
        pv_picollm_free_hardware_devices_func(hardware_devices, num_hardware_devices);
        close_dl(dl_handle);
        return EXIT_SUCCESS;
    }

    if (!(access_key && model_path && image_path)) {
        usage(argv[0]);
        exit(EXIT_FAILURE);
    }

    int32_t image_width = -1;
    int32_t image_height = -1;
    uint8_t *image = NULL;
    int32_t original_channels = -1;
    image = stbi_load(
            image_path,
            &image_width,
            &image_height,
            &original_channels,
            3);
    if (image == NULL) {
        fprintf(stderr, "Failed to load image: %s\n", stbi_failure_reason());
        exit(EXIT_FAILURE);
    }

    pv_status_t status = pv_picollm_init_func(
            access_key,
            model_path,
            device_string,
            &picollm);
    if (status != PV_STATUS_SUCCESS) {
        fprintf(
                stderr,
                "failed to init with `%s`",
                pv_status_to_string_func(status));
        print_error_message(
            message_stack,
            message_stack_depth,
            pv_get_error_stack_func,
            pv_free_error_stack_func,
            pv_status_to_string_func
        );
    }

    int32_t context_length = 0;
    status = pv_picollm_context_length_func(picollm, &context_length);
    if (status != PV_STATUS_SUCCESS) {
        fprintf(
                stderr,
                "Failed to get context length with `%s`.\n",
                pv_status_to_string_func(status));
        print_error_message(
            message_stack,
            message_stack_depth,
            pv_get_error_stack_func,
            pv_free_error_stack_func,
            pv_status_to_string_func
        );
    }

    if (max_output_tokens > context_length) {
        fprintf(
                stderr,
                "Max output tokens must be less than or equal to %d.\n",
                context_length);
        exit(EXIT_FAILURE);
    }

    char *model = NULL;
    status = pv_picollm_model_func(picollm, &model);
    if (status != PV_STATUS_SUCCESS) {
        fprintf(
                stderr,
                "Failed to get model with `%s`.\n",
                pv_status_to_string_func(status));
        print_error_message(
            message_stack,
            message_stack_depth,
            pv_get_error_stack_func,
            pv_free_error_stack_func,
            pv_status_to_string_func
        );
    }

    signal(SIGINT, interrupt_handler);
    fprintf(stdout, "Loaded model: `%s`\n", model);
    fprintf(stdout, "Generating... (press Ctrl+C to interrupt)\n");

    pv_picollm_endpoint_t endpoint;
    char *completion = NULL;
    status = pv_picollm_generate_ocr_func(
            picollm,
            image_width,
            image_height,
            image,
            max_output_tokens,
            completion_stream_callback,
            NULL,
            prompt_progress_callback,
            NULL,
            &endpoint,
            &completion);
    stbi_image_free(image);

    if (status != PV_STATUS_SUCCESS) {
        fprintf(
                stderr,
                "Failed to generate OCR with `%s`.\n",
                pv_status_to_string_func(status));
        print_error_message(
            message_stack,
            message_stack_depth,
            pv_get_error_stack_func,
            pv_free_error_stack_func,
            pv_status_to_string_func
        );
    }
    fprintf(stdout, "\n");

    struct timeval toc;
    gettimeofday(&toc, NULL);

    pv_picollm_delete_completion_func(completion);
    pv_picollm_delete_func(picollm);
    close_dl(dl_handle);

    return EXIT_SUCCESS;
}

int main(int argc, char *argv[]) {

#if defined(_WIN32) || defined(_WIN64)

#define UTF8_COMPOSITION_FLAG (0)
#define NULL_TERMINATED (-1)

    LPWSTR *wargv = CommandLineToArgvW(GetCommandLineW(), &argc);
    if (wargv == NULL) {
      fprintf(stderr, "CommandLineToArgvW failed\n");
      exit(1);
    }

    char *utf8_argv[argc];

    for (int i = 0; i < argc; ++i) {
      // WideCharToMultiByte:
      // https://docs.microsoft.com/en-us/windows/win32/api/stringapiset/nf-stringapiset-widechartomultibyte
      int arg_chars_num =
          WideCharToMultiByte(CP_UTF8, UTF8_COMPOSITION_FLAG, wargv[i],
                              NULL_TERMINATED, NULL, 0, NULL, NULL);
      utf8_argv[i] = (char *)malloc(arg_chars_num * sizeof(char));
      if (!utf8_argv[i]) {
        fprintf(stderr, "failed to to allocate memory for converting args");
      }
      WideCharToMultiByte(CP_UTF8, UTF8_COMPOSITION_FLAG, wargv[i],
                          NULL_TERMINATED, utf8_argv[i], arg_chars_num, NULL,
                          NULL);
    }

    LocalFree(wargv);
    argv = utf8_argv;

#endif

    int result = picovoice_main(argc, argv);

#if defined(_WIN32) || defined(_WIN64)

    for (int i = 0; i < argc; ++i) {
      free(utf8_argv[i]);
    }

#endif

    return result;
}
