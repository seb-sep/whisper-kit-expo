import ExpoModulesCore
import cocoa_whisper
import Foundation

public class WhisperKitExpoModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
    
    var pipe: WhisperKit? = nil

    func setPipe() async throws {
        pipe = try await WhisperKit()
    }
    
    func getPipe() async throws -> WhisperKit {
        while pipe == nil {
            try await Task.sleep(nanoseconds: 1_000_000)
        }
        return pipe!
    }

  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('WhisperKitExpo')` in JavaScript.
    Name("WhisperKitExpo")
      
      AsyncFunction("loadTranscriber")  { () -> Bool in
          do {
              try await setPipe()
              return true
          } catch {
              print(error)
              return false
          }
      }

      AsyncFunction("transcribe") { (path: String) -> String in
          do {
              let pipe = try await getPipe()
              let transcription = try await pipe.transcribe(audioPath: path);
              let val = transcription!.text
              return val
          } catch {
              return String(error.localizedDescription)
          }
    }
      
  }
}
