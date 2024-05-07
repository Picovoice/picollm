cmake_minimum_required(VERSION 3.13)
project(picollm_demo)

set(CMAKE_C_STANDARD 99)
set(CMAKE_BUILD_TYPE Release)

include_directories("${PROJECT_SOURCE_DIR}/../../include")

add_executable(picollm_demo_completion picollm_demo_completion.c)

if (NOT WIN32)
    target_link_libraries(picollm_demo_completion dl)
endif()
