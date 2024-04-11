cmake_minimum_required(VERSION 3.4)
project(mvm_demo_c)

set(CMAKE_C_STANDARD 99)
set(CMAKE_BUILD_TYPE Release)

set(COMMON_LIBS dl)
include_directories("${PROJECT_SOURCE_DIR}/../../include")

add_executable(
        mvm_demo_file
        mvm_demo_file.c)
