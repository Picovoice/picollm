Pod::Spec.new do |s|
  s.name = 'Mvm-iOS'
  s.module_name = 'Mvm'
  s.version = '1.0.0'
  s.license = {:type => 'Apache 2.0'}
  s.summary = 'iOS SDK for Mvm'
  s.description =
  <<-DESC
  Mvm engine.
  DESC
  s.homepage = 'https://github.com/Picovoice/mvm/tree/master/binding/ios'
  s.author = { 'Picovoice' => 'hello@picovoice.ai' }
  s.source = { :git => '' }
  s.ios.deployment_target = '13.0'
  s.swift_version = '5.0'
  s.vendored_frameworks = 'lib/ios/PvMvm.xcframework'
  s.source_files = '*.{swift}'
  s.exclude_files = 'MvmAppTest/**'
end
