//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import SwiftUI

struct CompletionView: View {
    @ObservedObject var viewModel: ViewModel

    @State var showSidebar = false
    @State var showStats = false

    var body: some View {
        let isError = viewModel.errorMessage.count > 0

        ZStack {
            VStack(alignment: .center) {
                HStack(alignment: .center) {
                    Button(
                        action: {() in showSidebar = !showSidebar},
                        label: {
                            Image(systemName: "slider.horizontal.3")
                                .padding(.horizontal, 12)
                        }
                    )
                    .disabled(!viewModel.enableGenerateButton)
                    Spacer()
                    Text("picoLLM Completion Demo")
                    Spacer()
                }

                Spacer()

                resultsBox

                Spacer()

                HStack(alignment: .center) {
                    if !viewModel.enableGenerateButton {
                        ProgressView(value: 0).progressViewStyle(CircularProgressViewStyle())
                        Text("Generating...")
                            .padding(.horizontal, 12)
                    }
                    if !viewModel.tpsText.isEmpty {
                        Text(viewModel.tpsText)
                            .padding(.horizontal, 12)
                    }
                    Spacer()
                }
                .padding(.horizontal, 24)

                if isError {
                   Text(viewModel.errorMessage)
                       .padding()
                       .foregroundColor(Color.white)
                       .frame(maxWidth: .infinity)
                       .background(Constants.dangerRed)
                       .font(.body)
                       .opacity(viewModel.errorMessage.isEmpty ? 0 : 1)
                       .cornerRadius(10)
                }

                ZStack {
                    TextField("Prompt", text: $viewModel.promptText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .submitLabel(.go)
                        .onSubmit {
                            viewModel.generate()
                        }
                        .disabled(!viewModel.enableGenerateButton)
                    HStack(alignment: .center) {
                        Spacer()
                        Button(action: viewModel.generate) {
                            Image(systemName: "arrow.up")
                                .imageScale(.medium)
                                .background(Constants.btnColor(viewModel.enableGenerateButton))
                                .foregroundColor(.white)
                                .padding(6)
                        }.background(
                            Capsule().fill(Constants.btnColor(viewModel.enableGenerateButton))
                        )
                        .padding(.horizontal, 4)
                        .disabled(!viewModel.enableGenerateButton)
                    }
                }
                .padding(.vertical, 12)
                .padding(.horizontal, 24)
            }
            .padding(.bottom, 32)
            .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity).background(Color.white)

            SidebarView(viewModel: viewModel, isSidebarVisible: $showSidebar)
        }
    }

    var resultsBox: some View {
        VStack {
            ScrollViewReader { proxy in
                ScrollView {
                    if showStats && viewModel.enableGenerateButton {
                        Text(viewModel.statsText)
                            .padding(12)
                    } else {
                        (Text(viewModel.completionPromptText).foregroundColor(Constants.activeBlue) +
                         Text(viewModel.completionText))
                        .padding(12)
                        .id(0)
                    }
                }.onChange(of: viewModel.completionText) { _ in
                    proxy.scrollTo(0, anchor: .bottom)
                }
            }
            .frame(
                maxWidth: .infinity,
                maxHeight: .infinity,
                alignment: .topLeading
            )
            .font(.body)

            HStack {
                Button(action: viewModel.unloadPicollm) {
                    Image(systemName: "arrow.left")
                        .imageScale(.large)
                }
                .padding(.horizontal, 12)
                .disabled(!viewModel.enableGenerateButton)
                Spacer()
                Button(
                    action: {() in showStats = !showStats},
                    label: {
                        Image(systemName: "chevron.left")
                            .imageScale(.small)
                        if showStats && viewModel.enableGenerateButton {
                            Text("/")
                        } else {
                            Text(" ")
                        }
                        Image(systemName: "chevron.right")
                            .imageScale(.small)
                    }
                )
                .padding(.horizontal, 12)
                .disabled(
                    viewModel.errorMessage.count > 0 ||
                    !viewModel.enableGenerateButton ||
                    viewModel.completionText.isEmpty)
            }
            .padding(.bottom, 12)
        }
        .frame(
            maxWidth: .infinity,
            maxHeight: .infinity,
            alignment: .topLeading
        )
        .background(Constants.backgroundGrey)
        .cornerRadius(3.0)
        .padding(24)
    }
}

#Preview {
    CompletionView(viewModel: ViewModel())
}
