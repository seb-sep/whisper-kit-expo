import ExpoModulesCore
import WhisperKit
import Foundation

public class WhisperKitExpoModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    
    var pipe: WhisperPipe? = nil
    var initializing = false
    
    func getPipe() async throws -> WhisperPipe {
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
        
        Property("transcriberReady") {
            return pipe != nil
        }
        
        AsyncFunction("loadTranscriber")  { () -> Bool in
            initializing = true
            do {
                pipe = try await WhisperPipe()
                return true
            } catch {
                print(error)
                return false
            }
        }
        
        AsyncFunction("transcribe") { (path: String) -> TranscribeResult in
            if !initializing {
                return TranscribeResult(success: false, result: "loadTranscriber() has not been called yet")
            }
            
            do {
                let pipe = try await getPipe()
                let transcription =  try await pipe.transcribe(path: path)
                return TranscribeResult(success: true, result: transcription)
            } catch {
                return TranscribeResult(success: false, result: error.localizedDescription)
            }
        }
    }
}

actor WhisperPipe {
    private var pipe: WhisperKit
    
    init() async throws {
        self.pipe = try await WhisperKit()
    }
    
    func transcribe(path: String) async throws -> String {
        let transcription: TranscriptionResult = try await self.pipe.transcribe(audioPath: path)[0]
        return transcription.text
    }
}

struct TranscribeResult: Record {
    @Field
    var success: Bool = false
    
    @Field
    // When transcription is sucessful, this is the transcription,
    // when it fails, it is an error message or empty
    var result: String = ""
}
