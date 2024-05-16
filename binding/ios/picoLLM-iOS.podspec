Pod::Spec.new do |s|
  s.name = 'picoLLM-iOS'
  s.module_name = 'PicoLLM'
  s.version = '1.0.0'
  s.license = {:type => 'Apache 2.0'}
  s.summary = 'picoLLM Inference Engine'
  s.description =
  <<-DESC
  picoLLM Inference Engine iOS SDK.
  DESC
  s.homepage = 'https://github.com/Picovoice/picollm/tree/master/binding/ios'
  s.author = { 'Picovoice' => 'hello@picovoice.ai' }
  s.source = { :git => "https://github.com/Picovoice/picollm.git", :tag => "picoLLM-iOS-v1.0.0" }
  s.ios.deployment_target = '16.0'
  s.swift_version = '5.0'
  s.vendored_frameworks = 'lib/ios/PvPicoLLM.xcframework'
  s.source_files = 'binding/ios/*.{swift}'
  s.exclude_files = 'binding/ios/PicoLLMAppTest/**'
end
