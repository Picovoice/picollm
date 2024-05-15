//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import SwiftUI

struct ChatView: View {
    @ObservedObject var viewModel: ViewModel

    var body: some View {
        let isError = viewModel.errorMessage.count > 0

        ZStack {
            VStack(alignment: .center) {
                Text("PicoLLM Chat Demo")

                Spacer()

                resultsBox

                Spacer()

                HStack(alignment: .center) {
                    if !viewModel.enableGenerateButton {
                        ProgressView(value: 0).progressViewStyle(CircularProgressViewStyle())
                        Text("Generating...")
                            .padding(.horizontal, 12)
                    }
                    Spacer()
                }
                .padding(.horizontal, 24)

                ZStack {
                    TextField("Message picoLLM", text: $viewModel.promptText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .submitLabel(.go)
                        .onSubmit {
                            viewModel.generate()
                        }
                        .disabled(isError || !viewModel.enableGenerateButton)
                    HStack(alignment: .center) {
                        Spacer()
                        Button(action: viewModel.generate) {
                            Image(systemName: "arrow.up")
                                .imageScale(.medium)
                                .background(Constants.btnColor(viewModel.enableGenerateButton && !isError))
                                .foregroundColor(.white)
                                .padding(6)
                        }.background(
                            Capsule().fill(Constants.btnColor(viewModel.enableGenerateButton && !isError))
                        )
                        .padding(.horizontal, 4)
                        .disabled(isError || !viewModel.enableGenerateButton)
                    }
                }
                .padding(12)
            }.frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity).background(Color.white)
        }
    }

    var resultsBox: some View {
        VStack {
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(alignment: .leading) {
                        ForEach(0..<viewModel.chatText.count, id: \.self) { i in
                            let speaker = viewModel.chatText[i].speaker
                            let msg = viewModel.chatText[i].msg
                            return (
                                Text("\(speaker)\n").foregroundColor(Constants.activeBlue)
                                +
                                Text("\(msg)\n\n")
                            )
                        }
                    }
                    .padding(12)
                    .id(0)
                }.onChange(of: viewModel.chatText) { _ in
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
                .padding(24)
                .disabled(!viewModel.enableGenerateButton)
                Spacer()
                Button(action: viewModel.clearText) {
                    Image(systemName: "arrow.counterclockwise")
                        .imageScale(.large)
                }
                .padding(24)
                .disabled(
                    viewModel.errorMessage.count > 0 ||
                    !viewModel.enableGenerateButton ||
                    viewModel.chatText.isEmpty)
            }
        }
        .frame(
            maxWidth: .infinity,
            maxHeight: .infinity,
            alignment: .topLeading
        )
        .background(Constants.backgroundGrey)
        .border(/*@START_MENU_TOKEN@*/Color.black/*@END_MENU_TOKEN@*/)
        .padding(12)
    }
}

#Preview {
    ChatView(viewModel: ViewModel())
}
