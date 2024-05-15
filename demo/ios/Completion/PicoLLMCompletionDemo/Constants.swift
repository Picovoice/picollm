//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import SwiftUI

class Constants {
    public static let activeBlue = Color(red: 55/255, green: 125/255, blue: 1, opacity: 1)
    public static let dangerRed = Color(red: 1, green: 14/255, blue: 14/255, opacity: 1)
    public static let secondaryGrey = Color(red: 118/255, green: 131/255, blue: 142/255, opacity: 1)
    public static let backgroundGrey = Color(red: 118/255, green: 131/255, blue: 142/255, opacity: 0.1)

    public static let btnColor = {(enabled: Bool) in (!enabled) ? secondaryGrey : activeBlue}
    public static let errorMsgColor = {(enabled: Bool) in (!enabled) ? dangerRed : Color.white}
}
