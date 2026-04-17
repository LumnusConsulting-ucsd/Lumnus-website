"use client";

const collageImages = [
  "/projects1.JPEG",
  "/projects2.JPEG",
  "/projects3.JPEG",
];

export function PhotoCollage() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="grid grid-cols-3 h-full w-full">
        {collageImages.map((src) => (
          <div
            key={src}
            className="bg-cover bg-center h-full w-full"
            style={{
              backgroundImage: `url('${src}')`,
            }}
          />
        ))}
      </div>
    </div>
  );
}