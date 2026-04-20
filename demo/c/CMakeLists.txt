cmake_minimum_required(VERSION 3.13)
project(picollm_demo)

set(CMAKE_C_STANDARD 99)
set(CMAKE_BUILD_TYPE Release)

include_directories("${PROJECT_SOURCE_DIR}/../../include")

add_executable(picollm_demo_completion picollm_demo_completion.c)
target_link_libraries(picollm_demo_completion m)
target_include_directories(picollm_demo_completion PRIVATE stb)

add_executable(picollm_demo_ocr picollm_demo_ocr.c)
target_link_libraries(picollm_demo_ocr m)
target_include_directories(picollm_demo_ocr PRIVATE stb)

if (NOT WIN32)
    target_link_libraries(picollm_demo_completion dl)
    target_link_libraries(picollm_demo_ocr dl)
endif()
