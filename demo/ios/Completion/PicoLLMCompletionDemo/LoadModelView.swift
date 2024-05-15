//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import SwiftUI

struct LoadModelView: View {
    @ObservedObject var viewModel: ViewModel

    @State var showSidebar = false

    var body: some View {
        let isError = viewModel.errorMessage.count > 0

        VStack(alignment: .center) {
            Spacer()

            Text(viewModel.modelLoadStatusText)
                .frame(
                    minWidth: 0,
                    maxWidth: UIScreen.main.bounds.width - 50,
                    minHeight: UIScreen.main.bounds.height / 2)
                .padding(.vertical, 10)
                .padding(.horizontal, 10)
                .font(.body)
                .cornerRadius(.infinity)
            if !viewModel.enableLoadModelButton {
                ProgressView(value: 0).progressViewStyle(CircularProgressViewStyle())
            }

            Spacer()

            Button(action: viewModel.extractModelFile) {
                Text("Load Model")
                    .background(Constants.btnColor(viewModel.enableLoadModelButton && !isError))
                    .foregroundColor(.white)
                    .padding(.horizontal, 35.0)
                    .padding(.vertical, 20.0)
            }.background(
                Capsule().fill(Constants.btnColor(viewModel.enableLoadModelButton && !isError))
            )
            .padding(12)
            .disabled(isError || !viewModel.enableLoadModelButton)

            .fileImporter(
                isPresented: $viewModel.showFileImporter,
                allowedContentTypes: [.data],
                allowsMultipleSelection: false
            ) { result in
                switch result {
                case .success(let files):
                    viewModel.selectedModelUrl = files[0]
                    viewModel.loadPicollm()
                case .failure:
                    break
                }
            }

            Spacer()
        }.frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity).background(Color.white)
    }
}

#Preview {
    LoadModelView(viewModel: ViewModel())
}
