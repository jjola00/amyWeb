import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { artworks } from '@/lib/placeholder-images';

export default function AboutPage() {
    const profilePic = artworks.find(art => art.id === 'profile-pic');
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-headline md:text-5xl text-center text-primary mb-8">About the Artist</h1>
            <Card className="overflow-hidden shadow-lg border-border/60">
                <div className="md:grid md:grid-cols-3 md:items-start">
                    <div className="md:col-span-1">
                        {profilePic ? (
                            <Image
                                src={profilePic.imageUrl}
                                alt="A stylized portrait of the artist"
                                width={profilePic.width}
                                height={profilePic.height}
                                className="object-cover w-full h-auto md:h-full"
                                data-ai-hint={profilePic.imageHint}
                                priority
                            />
                        ) : (
                            <div className="bg-muted aspect-square w-full h-full flex items-center justify-center">
                                <span className="text-muted-foreground">No Image</span>
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-2 p-6 md:p-8">
                        <CardHeader className="p-0">
                            <CardTitle className="font-headline text-4xl text-accent">Beetlehead</CardTitle>
                            <div className="text-muted-foreground pt-2 flex flex-wrap gap-2">
                                <Badge variant="secondary">She/They</Badge>
                                <Badge variant="secondary">Dublin, Ireland</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 mt-6 space-y-4 text-lg/relaxed">
                            <p>
                                Hey! I&apos;m a passionate digital artist and character designer with a love for all things colorful, creepy, and cute. My work is heavily inspired by animation, video games, and the endless wonders of the natural world.
                            </p>
                            <p>
                                When I&apos;m not drawing, you can usually find me at a local convention, sharing my art, meeting amazing people, and probably talking way too much about my favorite characters.
                            </p>
                            <blockquote className="p-4 bg-secondary rounded-lg text-secondary-foreground border-l-4 border-accent">
                                Fun fact: I love bugs! 🐛🦋🐞 My sketchbooks are filled with them.
                            </blockquote>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
}
