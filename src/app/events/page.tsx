import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, Star } from "lucide-react";
import { getEvents } from "@/lib/sanity-queries";
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

// Helper function to format time
function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Helper function to get badge variant and color
function getEventBadgeProps(status: Event['status']) {
  switch (status) {
    case 'upcoming':
      return { 
        variant: 'default' as const, 
        className: 'bg-red-500 hover:bg-red-600 text-white',
        emoji: '🔴'
      };
    case 'planned':
      return { 
        variant: 'secondary' as const, 
        className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
        emoji: '🟡'
      };
    case 'completed':
      return { 
        variant: 'outline' as const, 
        className: 'bg-green-100 text-green-800 border-green-300',
        emoji: '✅'
      };
    case 'cancelled':
      return { 
        variant: 'outline' as const, 
        className: 'bg-gray-100 text-gray-600 border-gray-300',
        emoji: '❌'
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

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-headline md:text-6xl text-center text-primary mb-4">EVENTS</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Some events I'm heading to
                </p>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No events scheduled</h3>
                    <p className="text-muted-foreground">Check back soon for upcoming events and exhibitions.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event: Event) => {
                        const badgeProps = getEventBadgeProps(event.status);
                        const eventDate = new Date(event.date);
                        const isUpcoming = eventDate > new Date();
                        
                        return (
                            <Card 
                                key={event._id} 
                                className={`flex flex-col hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${event.featured ? 'ring-2 ring-primary/20' : ''}`}
                            >
                                <CardHeader className="flex-grow">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="font-headline text-xl flex items-center gap-2">
                                            {event.name}
                                            {event.featured && (
                                                <span title="Featured Event">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                </span>
                                            )}
                                        </CardTitle>
                                    </div>
                                    
                                    <CardDescription className="pt-3 space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 flex-shrink-0" />
                                            <div>
                                                <div className="font-medium">{formatEventDate(event.date)}</div>
                                                <div className="text-xs text-muted-foreground">{formatEventTime(event.date)}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            <span>{event.location}</span>
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