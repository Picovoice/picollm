/*
    Copyright 2024 Picovoice Inc.
    You may not use this file except in compliance with the license. A copy of
   the license is located in the "LICENSE" file accompanying this source. Unless
   required by applicable law or agreed to in writing, software distributed
   under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

#include <getopt.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#if defined(_WIN32) || defined(_WIN64)

#include <windows.h>

#else

#include <dlfcn.h>

#endif

#include "pv_mvm.h"

static void *open_dl(const char *dl_path) {

#if defined(_WIN32) || defined(_WIN64)

    return LoadLibrary(dl_path);

#else

    return dlopen(dl_path, RTLD_NOW);

#endif
}

static void *load_symbol(void *handle, const char *symbol) {

#if defined(_WIN32) || defined(_WIN64)

    return GetProcAddress((HMODULE) handle, symbol);

#else

    return dlsym(handle, symbol);

#endif
}

static void close_dl(void *handle) {

#if defined(_WIN32) || defined(_WIN64)

    FreeLibrary((HMODULE) handle);

#else

    dlclose(handle);

#endif
}

static void print_dl_error(const char *message) {

#if defined(_WIN32) || defined(_WIN64)

    fprintf(stderr, "%s with code '%lu'.\n", message, GetLastError());

#else

    fprintf(stderr, "%s with '%s'.\n", message, dlerror());

#endif
}

static struct option long_options[] = {
        {"library_path",           required_argument, NULL, 'l'},
        {"weights_path",           required_argument, NULL, 'w'},
        {"device_string",          required_argument, NULL, 'd'},
        {"iterations",             required_argument, NULL, 'c'},
};

void print_usage(const char *program_name) {
    fprintf(stdout, "Usage: %s -l LIBRARY_PATH -w WEIGHTS_PATH -d DEVICE_STRING [-c iterations]\n", program_name);
}

void print_error_message(char **message_stack, int32_t message_stack_depth) {
    for (int32_t i = 0; i < message_stack_depth; i++) {
        fprintf(stderr, "  [%d] %s\n", i, message_stack[i]);
    }
}

int picovoice_main(int argc, char *argv[]) {
    const char *library_path = NULL;
    const char *weights_path = NULL;
    const char *device_string = NULL;
    int32_t iterations = 10;

    int c;
    while ((c = getopt_long(argc, argv, "l:w:d:i:", long_options, NULL)) != -1) {
        switch (c) {
            case 'l':
                library_path = optarg;
                break;
            case 'w':
                weights_path = optarg;
                break;
            case 'd':
                device_string = optarg;
                break;
            case 'i':
                iterations = atoi(optarg);
                break;
            default:
                exit(1);
        }
    }

    if (!library_path || !weights_path || !device_string) {
        print_usage(argv[0]);
        exit(1);
    }

    void *mvm_library = open_dl(library_path);
    if (!mvm_library) {
        fprintf(stderr, "failed to open library at '%s'.\n", library_path);
        exit(1);
    }

    const char *(*pv_status_to_string_func)(pv_status_t) =
            load_symbol(mvm_library, "pv_status_to_string");
    if (!pv_status_to_string_func) {
        print_dl_error("failed to load 'pv_status_to_string'");
        exit(1);
    }

    pv_status_t (*pv_mvm_init_func)(const char *, pv_mvm_t **) =
            load_symbol(mvm_library, "pv_mvm_init");
    if (!pv_mvm_init_func) {
        print_dl_error("failed to load 'pv_mvm_init'");
        exit(1);
    }

    pv_status_t (*pv_mvm_delete_func)(pv_mvm_t *) =
            load_symbol(mvm_library, "pv_mvm_delete");
    if (!pv_mvm_delete_func) {
        print_dl_error("failed to load 'pv_mvm_delete'");
        exit(1);
    }

    pv_status_t (*pv_mvm_load_model_file_func)(pv_mvm_t *, const char *, int32_t) =
            load_symbol(mvm_library, "pv_mvm_load_model_file");
    if (!pv_mvm_load_model_file_func) {
        print_dl_error("failed to load 'pv_mvm_load_model_file'");
        exit(1);
    }

    pv_status_t (*pv_mvm_load_model_chunk_func)(pv_mvm_t *, const uint8_t *, int32_t, bool *) =
            load_symbol(mvm_library, "pv_mvm_load_model_chunk");
    if (!pv_mvm_load_model_chunk_func) {
        print_dl_error("failed to load 'pv_mvm_load_model_chunk'");
        exit(1);
    }

    pv_status_t (*pv_mvm_matrix_dimensions_func)(pv_mvm_t *, int32_t *, int32_t *) =
            load_symbol(mvm_library, "pv_mvm_matrix_dimensions");
    if (!pv_mvm_matrix_dimensions_func) {
        print_dl_error("failed to load 'pv_mvm_matrix_dimensions'");
        exit(1);
    }

    pv_status_t (*pv_mvm_chain_multiply_func)(pv_mvm_t *, float *, int32_t, float *) =
            load_symbol(mvm_library, "pv_mvm_chain_multiply");
    if (!pv_mvm_chain_multiply_func) {
        print_dl_error("failed to load 'pv_mvm_chain_multiply'");
        exit(1);
    }

    const char *(*pv_mvm_version_func)(void) =
            load_symbol(mvm_library, "pv_mvm_version");
    if (!pv_mvm_version_func) {
        print_dl_error("failed to load 'pv_mvm_version'");
        exit(1);
    }

    int32_t (*pv_mvm_min_chunk_size_func)(void) =
            load_symbol(mvm_library, "pv_mvm_min_chunk_size");
    if (!pv_mvm_min_chunk_size_func) {
        print_dl_error("failed to load 'pv_mvm_min_chunk_size'");
        exit(1);
    }

    int32_t (*pv_mvm_max_chunk_size_func)(void) =
            load_symbol(mvm_library, "pv_mvm_max_chunk_size");
    if (!pv_mvm_max_chunk_size_func) {
        print_dl_error("failed to load 'pv_mvm_max_chunk_size'");
        exit(1);
    }

    pv_status_t (*pv_get_error_stack_func)(char ***, int32_t *) = load_symbol(mvm_library, "pv_get_error_stack");
    if (!pv_get_error_stack_func) {
        print_dl_error("failed to load 'pv_get_error_stack_func'");
        exit(1);
    }

    void (*pv_free_error_stack_func)(char **) = load_symbol(mvm_library, "pv_free_error_stack");
    if (!pv_free_error_stack_func) {
        print_dl_error("failed to load 'pv_free_error_stack_func'");
        exit(1);
    }

    pv_mvm_t *mvm = NULL;
    pv_status_t status = pv_mvm_init_func(device_string, &mvm);
    if (status != PV_STATUS_SUCCESS) {
        return 1;
    }

    status = pv_mvm_load_model_file_func(mvm, weights_path, 1024 * 1024);

    int32_t matrix_m = 0;
    int32_t matrix_n = 0;
    status = pv_mvm_matrix_dimensions_func(mvm, &matrix_m, &matrix_n);

    float *input_vector = (float *) malloc(matrix_n * sizeof(float));
    float *result_vector = (float *) malloc(matrix_n * sizeof(float));

    for (int32_t i = 0; i < matrix_n; i++) {
        const float value = i;
        input_vector[i] = value;
    }

    char **message_stack = NULL;
    int32_t message_stack_depth = 0;
    pv_status_t error_status = PV_STATUS_RUNTIME_ERROR;

    struct timeval before;
    gettimeofday(&before, NULL);

    status = pv_mvm_chain_multiply_func(
            mvm,
            input_vector,
            iterations,
            result_vector);
    if (status != PV_STATUS_SUCCESS) {
        fprintf(stderr, "failed to init with '%s'", pv_status_to_string_func(status));
        error_status = pv_get_error_stack_func(&message_stack, &message_stack_depth);
        if (error_status != PV_STATUS_SUCCESS) {
            fprintf(stderr, ".\nUnable to get Mvm error state with '%s'.\n", pv_status_to_string_func(error_status));
            exit(1);
        }

        if (message_stack_depth > 0) {
            fprintf(stderr, ":\n");
            print_error_message(message_stack, message_stack_depth);
            pv_free_error_stack_func(message_stack);
        } else {
            fprintf(stderr, ".\n");
        }

        exit(1);
    }

    struct timeval after;
    gettimeofday(&after, NULL);

    double proc_sec = ((double)(after.tv_sec - before.tv_sec) +
                     ((double)(after.tv_usec - before.tv_usec)) * 1e-6);
    fprintf(stdout, "Proc took `%f` sec\n", proc_sec);

    pv_mvm_delete_func(mvm);

    close_dl(mvm_library);

    return 0;
}

int main(int argc, char *argv[]) {

#if defined(_WIN32) || defined(_WIN64)

#define UTF8_COMPOSITION_FLAG (0)
#define NULL_TERMINATED       (-1)

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
                WideCharToMultiByte(CP_UTF8, UTF8_COMPOSITION_FLAG, wargv[i], NULL_TERMINATED, NULL, 0, NULL, NULL);
        utf8_argv[i] = (char *) malloc(arg_chars_num * sizeof(char));
        if (!utf8_argv[i]) {
            fprintf(stderr, "failed to to allocate memory for converting args");
        }
        WideCharToMultiByte(CP_UTF8, UTF8_COMPOSITION_FLAG, wargv[i], NULL_TERMINATED, utf8_argv[i], arg_chars_num, NULL, NULL);
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
