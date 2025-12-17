// swift-tools-version:5.7
import PackageDescription
let package = Package(
    name: "picoLLM-iOS",
    platforms: [
        .iOS(.v16)
    ],
    products: [
        .library(
            name: "PicoLLM",
            targets: ["PicoLLM"]
        )
    ],
    targets: [
        .binaryTarget(
            name: "PvPicoLLM",
            path: "lib/ios/PvPicoLLM.xcframework"
        ),
        .target(
            name: "PicoLLM",
            dependencies: ["PvPicoLLM"],
            path: ".",
            exclude: [
                "binding/ios/PicoLLMAppTest",
                "demo"
            ],
            sources: [
                "binding/ios/PicoLLM.swift",
                "binding/ios/PicoLLMDialog.swift",
                "binding/ios/PicoLLMErrors.swift"
            ]
        )
    ]
)
