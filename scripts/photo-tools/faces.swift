// Detects faces with macOS's built-in Vision framework (no installs).
// Usage: swift scripts/photo-tools/faces.swift img1.jpg img2.jpg ...
// Prints JSON: [{ "file", "width", "height", "faces": [{ "x","y","w","h","confidence" }] }]
// Coordinates are pixels with a top-left origin. Feed it already-rotated images.
import Foundation
import Vision
import ImageIO

var results: [[String: Any]] = []
for path in CommandLine.arguments.dropFirst() {
    let url = URL(fileURLWithPath: path)
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
        results.append(["file": path, "error": "unreadable"]); continue
    }
    let W = Double(img.width), H = Double(img.height)
    let req = VNDetectFaceRectanglesRequest()
    try? VNImageRequestHandler(cgImage: img, options: [:]).perform([req])
    let faces = (req.results ?? []).map { f -> [String: Double] in
        let b = f.boundingBox // normalized, bottom-left origin
        return ["x": b.minX * W, "y": (1 - b.maxY) * H, "w": b.width * W, "h": b.height * H, "confidence": Double(f.confidence)]
    }
    results.append(["file": path, "width": W, "height": H, "faces": faces])
}
let data = try! JSONSerialization.data(withJSONObject: results, options: [.prettyPrinted])
print(String(data: data, encoding: .utf8)!)
