/*
    Copyright 2024 Picovoice Inc.

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
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>

#if defined(_WIN32) || defined(_WIN64)

#include <windows.h>

#endif

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
            "[-d DEVICE] [-s STOP_PHRASES] [-n MAX_OUTPUT_TOKENS] [-c NUM_TOP_CHOICES] "
            "[-r PRESENCE_PENALTY] [-f FREQUENCY_PENALTY] "
            "[-o TOP_P] [-t TEMPERATURE] [-e SEED] [-v] [-h] -p PROMPT\n"
            "-v: enable verbose output\n"
            "-h: show available devices\n",
            program);
}

static const char *pv_picollm_endpoint_to_string(pv_picollm_endpoint_t x) {
    static const char *STRINGS[] = {
            "END_OF_SENTENCE",
            "COMPLETION_TOKEN_LIMIT_REACHED",
            "STOP_PHRASE_ENCOUNTERED",
    };

    return STRINGS[x];
}

static int32_t num_tokens = -1;
struct timeval tic;

static void progress_callback(const char *token, void *context) {
    (void) context;

    fprintf(stdout, "%s", token);
    fflush(stdout);
    if (num_tokens == -1) {
        gettimeofday(&tic, NULL);
    }
    num_tokens += 1;
}

int picovoice_main(int argc, char **argv) {
    const char *SHORT_OPTIONS = "a:l:m:d:c:s:e:r:f:o:t:n:c:p:vh";

    const char *access_key = NULL;
    const char *model_path = NULL;
    const char *library_path = NULL;
    const char *device_string = "best";
    float presence_penalty = 0.f;
    float frequency_penalty = 0.f;
    int32_t seed = -1;
    float top_p = .9f;
    float temperature = .6f;
    int32_t max_output_tokens = -1;
    int32_t num_stop_phrases = 0;
    const char **stop_phrases = NULL;
    int32_t num_top_choices = 0;
    bool verbose = false;
    bool show_devices = false;
    char *prompt = NULL;

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
            case 'r':
                presence_penalty = (float) strtod(optarg, NULL);
                break;
            case 'f':
                frequency_penalty = (float) strtod(optarg, NULL);
                break;
            case 'e':
                seed = (int32_t) strtol(optarg, NULL, 10);
                break;
            case 'o':
                top_p = (float) strtod(optarg, NULL);
                break;
            case 't':
                temperature = (float) strtod(optarg, NULL);
                break;
            case 'n':
                max_output_tokens = (int32_t) strtol(optarg, NULL, 10);
                break;
            case 's': {
                int32_t i = optind - 1;
                while ((i < argc) && (argv[i][0] != '-')) {
                    i++;
                }
                num_stop_phrases = i - (optind - 1);

                stop_phrases = calloc(num_stop_phrases, sizeof(char *));
                if (!stop_phrases) {
                    exit(EXIT_FAILURE);
                }

                i = optind - 1;
                while ((i < argc) && (argv[i][0] != '-')) {
                    stop_phrases[i - (optind - 1)] = argv[i];
                    i++;
                }

                optind = i;
            }
                break;
            case 'c':
                num_top_choices = (int32_t) strtol(optarg, NULL, 10);
                break;
            case 'p': {
                size_t prompt_length = 0;
                int32_t i = optind - 1;
                while ((i < argc) && (argv[i][0] != '-')) {
                    prompt_length += strlen(argv[i]) + 1;
                    i++;
                }

                prompt = calloc(prompt_length + 1, sizeof(char));
                if (!prompt) {
                    exit(EXIT_FAILURE);
                }

                i = optind - 1;
                while ((i < argc) && (argv[i][0] != '-')) {
                    strcat(prompt, argv[i]);
                    strcat(prompt, " ");
                    i++;
                }
                prompt[prompt_length - 1] = '\0';

                optind = i;
            }
                break;
            case 'd':
                device_string = optarg;
                break;
            case 'v':
                verbose = true;
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

    pv_status_t (*pv_picollm_generate_func)(
            pv_picollm_t *,
            const char *,
            int32_t,
            const char *const *,
            int32_t,
            int32_t,
            float,
            float,
            float,
            float,
            int32_t,
            pv_picollm_stream_callback_t,
            void *,
            pv_picollm_usage_t *,
            pv_picollm_endpoint_t *,
            pv_picollm_completion_token_t **,
            int32_t *,
            char **) = load_symbol(dl_handle, "pv_picollm_generate");
    if (!pv_picollm_generate_func) {
        print_dl_error("failed to load `pv_picollm_generate`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_delete_completion_tokens_func)(pv_picollm_completion_token_t *, int32_t) = 
        load_symbol(dl_handle, "pv_picollm_delete_completion_tokens");
    if (!pv_picollm_delete_completion_tokens_func) {
        print_dl_error("failed to load `pv_picollm_delete_completion_tokens`");
        exit(EXIT_FAILURE);
    }

    pv_status_t (*pv_picollm_delete_completion_func)(char *) = 
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

    int32_t (*pv_picollm_max_top_choices_func)(void) = 
        load_symbol(dl_handle, "pv_picollm_max_top_choices");
    if (!pv_picollm_max_top_choices_func) {
        print_dl_error("failed to load `pv_picollm_max_top_choices`");
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

    fprintf(stdout, "picoLLM: `%s`\n", pv_picollm_version_func());

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

    if (!(access_key && model_path && prompt)) {
        usage(argv[0]);
        exit(EXIT_FAILURE);
    }

    const int32_t max_top_choices = pv_picollm_max_top_choices_func();
    if (num_top_choices > max_top_choices) {
        fprintf(
                stderr,
                "Number of top choices must be less than or equal to %d.\n",
                max_top_choices);
        exit(EXIT_FAILURE);
    }

    pv_picollm_t *picollm = NULL;
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

    fprintf(stdout, "Loaded model: `%s`\n", model);

    pv_picollm_usage_t usage;
    pv_picollm_endpoint_t endpoint;
    int32_t num_completion_tokens = 0;
    pv_picollm_completion_token_t *completion_tokens = NULL;
    char *completion = NULL;
    status = pv_picollm_generate_func(
            picollm,
            prompt,
            max_output_tokens,
            stop_phrases,
            num_stop_phrases,
            seed,
            presence_penalty,
            frequency_penalty,
            temperature,
            top_p,
            num_top_choices,
            progress_callback,
            NULL,
            &usage,
            &endpoint,
            &completion_tokens,
            &num_completion_tokens,
            &completion);
    free(prompt);
    free(stop_phrases);
    if (status != PV_STATUS_SUCCESS) {
        fprintf(
                stderr,
                "Failed to generate with `%s`.\n",
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

    fprintf(
            stdout,
            "Generated %.2f tokens per sec\n",
            (double) (usage.completion_tokens - 1) /
            ((double) (toc.tv_sec - tic.tv_sec) + (double) (toc.tv_usec - tic.tv_usec) / 1e6));

    if (verbose) {
        fprintf(stdout, "\nUsage:\n");
        fprintf(stdout, "  prompt tokens: %d\n", usage.prompt_tokens);
        fprintf(stdout, "  completion tokens: %d\n", usage.completion_tokens);

        fprintf(stdout, "endpoint: %s\n", pv_picollm_endpoint_to_string(endpoint));
        fprintf(stdout, "completion-tokes:\n");
        for (int32_t i = 0; i < num_completion_tokens; i++) {
            fprintf(stdout, "token: %-10s - log_prob: %3.1f\n", completion_tokens[i].token.token,
                    completion_tokens[i].token.log_prob);
            if (num_top_choices > 0) {
                for (int32_t j = 0; j < (num_top_choices - 1); j++) {
                    fprintf(
                            stdout,
                            "  top-choice: %-10s - log_prob: %3.1f\n",
                            completion_tokens[i].top_choices[j].token,
                            completion_tokens[i].top_choices[j].log_prob);
                }
                fprintf(
                        stdout,
                        "  top-choice: %-10s - log_prob: %3.1f\n",
                        completion_tokens[i].top_choices[num_top_choices - 1].token,
                        completion_tokens[i].top_choices[num_top_choices - 1].log_prob);

            }
        }
        fprintf(stdout, "completion: %s\n", completion);
    }

    pv_picollm_delete_completion_func(completion);
    pv_picollm_delete_completion_tokens_func(completion_tokens, num_completion_tokens);
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
