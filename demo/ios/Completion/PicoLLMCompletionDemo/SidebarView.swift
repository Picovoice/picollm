//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import PicoLLM
import SwiftUI

struct SidebarView: View {
    @ObservedObject var viewModel: ViewModel

    @Binding var isSidebarVisible: Bool
    var sideBarWidth = UIScreen.main.bounds.size.width * 0.80

    var body: some View {
        ZStack {
            GeometryReader { _ in
                EmptyView()
            }
            .background(.black.opacity(0.6))
            .opacity(isSidebarVisible ? 1 : 0)
            .animation(.easeInOut.delay(0.2), value: isSidebarVisible)
            .onTapGesture {
                isSidebarVisible.toggle()
            }
            content
        }
        .edgesIgnoringSafeArea(.all)
    }

    var content: some View {
        HStack(alignment: .top) {
            ZStack(alignment: .top) {
                Color.white
                settings
            }
            .frame(width: sideBarWidth)
            .offset(x: isSidebarVisible ? 0 : -sideBarWidth)
            .animation(.default, value: isSidebarVisible)

            Spacer()
        }
    }

    var settings: some View {
        VStack(alignment: .center) {
            Spacer()
            Text("Completion Settings")
                .bold()
                .padding(.bottom, 32)
            sliderSetting(
                name: "Temperature",
                value: $viewModel.generateTemperature,
                min: 0,
                max: 1)
            sliderSetting(
                name: "Completion Token Limit",
                value: $viewModel.generateCompletionTokenLimit,
                min: 1,
                max: 4096,
                step: 1,
                fmt: "%.0f")
            textSetting(
                name: "Stop Phrases",
                placeholder: "phrase 1, phrase 2",
                value: $viewModel.stopPhrasesText)
            sliderSetting(
                name: "Top P",
                value: $viewModel.generateTopP,
                min: 0,
                max: 1)
            sliderSetting(
                name: "Presence Penalty",
                value: $viewModel.generatePresencePenalty,
                min: 0,
                max: 1)
            sliderSetting(
                name: "Frequency Penalty",
                value: $viewModel.generateFrequencyPenalty,
                min: 0,
                max: 1)
            sliderSetting(
                name: "# Top Choices",
                value: $viewModel.generateNumTopChoices,
                min: 0,
                max: Double(PicoLLM.maxTopChoices),
                step: 1,
                fmt: "%.0f")
        Spacer()
        }
    }

    func sliderSetting(
            name: String,
            value: Binding<Double>,
            min: Double,
            max: Double,
            step: Double = 0.01,
            fmt: String = "%.2f") -> AnyView {
        return AnyView(
            VStack(alignment: .center) {
                HStack(alignment: .center) {
                    Text(name)
                    Spacer()
                    Text(String(format: fmt, value.wrappedValue))
                }
                Slider(value: value, in: min...max, step: step)
                    .accentColor(.accentColor)
            }
                .padding(.horizontal, 24)
        )
    }

    func textSetting(
            name: String,
            placeholder: String,
            value: Binding<String>) -> AnyView {
        return AnyView(
            VStack(alignment: .center) {
                HStack(alignment: .center) {
                    Text(name)
                    Spacer()
                }
                TextField(placeholder, text: value)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
                .padding(.horizontal, 24)
        )
    }
}

#Preview {
    SidebarView(viewModel: ViewModel(), isSidebarVisible: .constant(true))
}
