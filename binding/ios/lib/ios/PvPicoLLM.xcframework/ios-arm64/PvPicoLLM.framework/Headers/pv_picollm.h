#ifndef PV_MVM_H
#define PV_MVM_H

#include <stdint.h>
#include <stdbool.h>

#include "picovoice.h"

typedef struct pv_picollm pv_picollm_t;

PV_API pv_status_t pv_picollm_init(const char *device_string, pv_picollm_t **object);

PV_API void pv_picollm_delete(pv_picollm_t *object);

PV_API pv_status_t pv_picollm_load_model_file(
        pv_picollm_t *object,
        const char *filepath,
        int32_t chunk_size_bytes);

PV_API pv_status_t pv_picollm_load_model_chunk(
        pv_picollm_t *object,
        const uint8_t *chunk,
        int32_t chunk_size_bytes,
        bool *is_model_load_complete);

PV_API pv_status_t pv_picollm_matrix_dimensions(
        pv_picollm_t *object,
        int32_t *m,
        int32_t *n);

PV_API pv_status_t pv_picollm_chain_multiply(
        pv_picollm_t *object,
        const float *vector,
        int32_t iterations,
        float *result_vector);

PV_API const char *pv_picollm_version(void);

PV_API int32_t pv_picollm_min_chunk_size(void);

PV_API int32_t pv_picollm_max_chunk_size(void);

#endif // PV_MVM_H
