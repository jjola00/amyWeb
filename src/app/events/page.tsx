import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Star } from "lucide-react";
import { getEvents } from "@/lib/sanity-queries";
import { PhotoCarousel } from "@/components/events/photo-carousel";
import type { Event } from "@/types";

// Helper function to format date
function formatEventDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}



// Helper function to get badge variant and color
function getEventBadgeProps(status: Event['status']) {
    switch (status) {
        case 'upcoming':
            return {
                variant: 'default' as const,
                className: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                emoji: '🔴'
            };
        case 'done':
            return {
                variant: 'outline' as const,
                className: 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20',
                emoji: '🟢'
            };
        default:
            return {
                variant: 'secondary' as const,
                className: '',
                emoji: '📅'
            };
    }
}

export default async function EventsPage() {
    const events = await getEvents();
    const featuredEvents = events.filter((event: Event) => event.featured);
    const regularEvents = events.filter((event: Event) => !event.featured);

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-headline md:text-6xl text-center text-primary mb-4">EVENTS</h1>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No events scheduled</h3>
                    <p className="text-muted-foreground">Check back soon for upcoming events and exhibitions.</p>
                </div>
            ) : (
                <>
                    {/* Featured Events Section */}
                    {featuredEvents.length > 0 && (
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-headline text-primary mb-2 flex items-center justify-center gap-2">
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    FEATURED EVENTS
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                </h2>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-full max-w-5xl">
                                    <div
                                        className={`flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0 lg:grid lg:gap-8 lg:snap-none ${
                                            featuredEvents.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
                                        }`}
                                    >
                                        {featuredEvents.map((event: Event) => {
                                        const badgeProps = getEventBadgeProps(event.status);
                                        const hasMedia = event.media && event.media.length > 0;

                                        return (
                                            <Card
                                                key={event._id}
                                                className="flex flex-col snap-start shrink-0 w-[85%] sm:w-[70%] md:w-[60%] lg:w-full hover:border-primary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 ring-2 ring-primary/30 hover:ring-primary/50 bg-gradient-to-br from-card to-card/80"
                                            >
                                                {/* Media carousel for events with photos/videos */}
                                                {hasMedia && (
                                                    <div className="p-6 pb-0">
                                                        <PhotoCarousel media={event.media} eventName={event.name} />
                                                    </div>
                                                )}

                                                <CardHeader className="flex-grow p-6">
                                                    <div className="flex items-start justify-between">
                                                        <CardTitle className="font-headline text-2xl flex items-center gap-3 text-primary">
                                                            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                                            {event.name}
                                                        </CardTitle>
                                                    </div>

                                                    <CardDescription className="pt-4 space-y-4">
                                                        <div className="flex items-center gap-3 text-base">
                                                            <Calendar className="w-5 h-5 flex-shrink-0 text-primary" />
                                                            <div className="font-semibold text-foreground">{formatEventDate(event.date)}</div>
                                                        </div>

                                                        {event.description && (
                                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                                {event.description}
                                                            </p>
                                                        )}
                                                    </CardDescription>
                                                </CardHeader>

                                                <CardContent className="pt-0 p-6">
                                                    <div className="flex items-center justify-between">
                                                        <Badge
                                                            variant={badgeProps.variant}
                                                            className={`${badgeProps.className} text-base px-4 py-2`}
                                                        >
                                                            {badgeProps.emoji} {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                        </Badge>

                                                        {event.externalLink && (
                                                            <a
                                                                href={event.externalLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-base text-primary hover:text-primary/80 transition-colors font-medium"
                                                                title="View event details"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                                Details
                                                            </a>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Regular Events Section */}
                    {regularEvents.length > 0 && (
                        <div>
                            {featuredEvents.length > 0 && (
                                <div className="text-center mb-8">
                                    <h2 className="text-xl font-headline text-muted-foreground mb-2">MORE EVENTS</h2>
                                    <div className="w-24 h-px bg-border mx-auto"></div>
                                </div>
                            )}

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {regularEvents.map((event: Event) => {
                                    const badgeProps = getEventBadgeProps(event.status);
                                    const hasMedia = event.media && event.media.length > 0;

                                    return (
                                        <Card
                                            key={event._id}
                                            className="flex flex-col hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        >
                                            {/* Media carousel for events with photos/videos */}
                                            {hasMedia && (
                                                <div className="p-4 pb-0">
                                                    <PhotoCarousel media={event.media} eventName={event.name} />
                                                </div>
                                            )}

                                            <CardHeader className="flex-grow">
                                                <div className="flex items-start justify-between">
                                                    <CardTitle className="font-headline text-xl">
                                                        {event.name}
                                                    </CardTitle>
                                                </div>

                                                <CardDescription className="pt-3 space-y-3">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="w-4 h-4 flex-shrink-0" />
                                                        <div className="font-medium">{formatEventDate(event.date)}</div>
                                                    </div>

                                                    {event.description && (
                                                        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                                                            {event.description}
                                                        </p>
                                                    )}
                                                </CardDescription>
                                            </CardHeader>

                                            <CardContent className="pt-0">
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant={badgeProps.variant}
                                                        className={badgeProps.className}
                                                    >
                                                        {badgeProps.emoji} {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                    </Badge>

                                                    {event.externalLink && (
                                                        <a
                                                            href={event.externalLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                                                            title="View event details"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            Details
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Call to action for artists/event organizers */}
            <div className="mt-16 text-center">
                <div className="bg-muted/50 rounded-lg p-8">
                    <h3 className="text-xl font-semibold mb-2">Want to collaborate or host an event?</h3>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Reach out to me!                    </a>
                </div>
            </div>
        </div>
    );
}
