#ifndef PV_MVM_H
#define PV_MVM_H

#include <stdint.h>
#include <stdbool.h>

#include "picovoice.h"

typedef struct pv_mvm pv_mvm_t;

PV_API pv_status_t pv_mvm_init(const char *device_string, pv_mvm_t **object);

PV_API void pv_mvm_delete(pv_mvm_t *object);

PV_API pv_status_t pv_mvm_load_model_file(
        pv_mvm_t *object,
        const char *filepath,
        int32_t chunk_size_bytes);

PV_API pv_status_t pv_mvm_load_model_chunk(
        pv_mvm_t *object,
        const uint8_t *chunk,
        int32_t chunk_size_bytes,
        bool *is_model_load_complete);

PV_API pv_status_t pv_mvm_matrix_dimensions(
        pv_mvm_t *object,
        int32_t *m,
        int32_t *n);

PV_API pv_status_t pv_mvm_chain_multiply(
        pv_mvm_t *object,
        const float *vector,
        int32_t iterations,
        float *result_vector);

PV_API const char *pv_mvm_version(void);

PV_API int32_t pv_mvm_min_chunk_size(void);

PV_API int32_t pv_mvm_max_chunk_size(void);

#endif // PV_MVM_H
