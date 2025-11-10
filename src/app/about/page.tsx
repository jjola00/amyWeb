import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSiteSettings } from '@/lib/sanity-queries';

export default async function AboutPage() {
    const settings = await getSiteSettings();
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-headline md:text-5xl text-center text-primary mb-8">ABOUT</h1>
            <Card className="overflow-hidden shadow-lg border-border/60">
                <div className="md:grid md:grid-cols-3 md:items-start">
                    <div className="md:col-span-1">
                        {settings?.artistPhoto ? (
                            <Image
                                src={settings.artistPhoto.asset.url}
                                alt={settings.artistPhoto.alt || "Artist photo"}
                                width={400}
                                height={400}
                                className="object-cover w-full h-auto md:h-full"
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
                            <CardTitle className="font-headline text-4xl text-accent">
                                {settings?.artistName || 'Beetlehead'}
                            </CardTitle>
                            <div className="text-muted-foreground pt-2 flex flex-wrap gap-2">
                                <Badge variant="secondary">She/They</Badge>
                                <Badge variant="secondary">Dublin, Ireland</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 mt-6 space-y-4 text-lg/relaxed">
                            {settings?.artistBio ? (
                                <div>
                                    {/* We'll need to render the rich text bio here - for now, placeholder */}
                                    <p>Artist bio will be displayed here from Sanity CMS.</p>
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
                                        "Lorem ipsum dolor sit amet."
                                    </blockquote>
                                </>
                            )}
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
}