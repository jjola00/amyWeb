import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAboutPage } from '@/lib/sanity-queries';

export default async function AboutPage() {
    const aboutData = await getAboutPage();
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-headline md:text-6xl text-center text-primary mb-8">ABOUT</h1>
            <Card className="overflow-hidden shadow-lg border-border/60">
                <div className="md:grid md:grid-cols-3">
                    <div className="md:col-span-1 relative aspect-square md:aspect-auto md:h-full">
                        {aboutData?.artistPhoto ? (
                            <Image
                                src={aboutData.artistPhoto.asset.url}
                                alt={aboutData.artistPhoto.alt || "Artist photo"}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="bg-muted w-full h-full flex items-center justify-center">
                                <span className="text-muted-foreground">No Image</span>
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-2 p-6 md:p-8">
                        <CardHeader className="p-0">
                            <CardTitle className="font-headline text-4xl text-accent">
                                {aboutData?.artistName || 'Beetlehead'}
                            </CardTitle>
                            <div className="text-muted-foreground pt-2 flex flex-wrap gap-2">
                                <Badge variant="secondary">She/They</Badge>
                                {aboutData?.location && (
                                    <Badge variant="secondary">{aboutData.location}</Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 mt-6">
                            <div className="max-h-60 overflow-y-auto about-scroll pr-2 space-y-4 text-lg/relaxed">
                                {aboutData?.artistBio ? (
                                    <div className="whitespace-pre-line">
                                        {aboutData.artistBio}
                                    </div>
                                ) : (
                                    <>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                        <blockquote className="p-4 bg-secondary rounded-lg text-secondary-foreground border-l-4 border-accent">
                                            &ldquo;Lorem ipsum dolor sit amet.&rdquo;
                                        </blockquote>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
}