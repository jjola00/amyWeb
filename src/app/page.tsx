import { loadGalleryContent } from "@/lib/content";
import { ArtworkGrid } from "@/components/gallery/artwork-grid";

export default async function GalleryPage() {
  const galleryContent = await loadGalleryContent();
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline md:text-5xl text-primary">GALLERY</h1>
        <p className="mt-4 text-lg text-muted-foreground">A collection of my recent work. Click on any image to see more.</p>
      </div>
      <ArtworkGrid artworks={galleryContent.artworks} />
    </div>
  );
}
