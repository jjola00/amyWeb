import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const events = [
    { name: "Dublin Horror Con", date: "October 26-27, 2024", location: "Dublin, Ireland", status: "Upcoming" },
    { name: "DCAF 2025", date: "April 12, 2025", location: "Dublin, Ireland", status: "Upcoming" },
    { name: "MegaCon 2026", date: "February 5-8, 2026", location: "Orlando, FL", status: "Planned" },
    { name: "CEILICON 2026", date: "June 20-21, 2026", location: "Glasgow, UK", status: "Planned" },
    { name: "ANTHROCON 2026", date: "July 2-5, 2026", location: "Pittsburgh, PA", status: "Planned" },
];

export default function EventsPage() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-headline md:text-5xl text-center text-primary mb-8">Upcoming Events</h1>
            <p className="text-center text-lg text-muted-foreground mb-12">Come say hi! I&apos;d love to meet you and talk about art.</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Card key={event.name} className="flex flex-col hover:border-primary transition-colors duration-300 shadow-lg">
                        <CardHeader className="flex-grow">
                            <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
                            <CardDescription className="pt-2 space-y-2">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {event.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {event.location}
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'} className={event.status === 'Upcoming' ? 'bg-accent text-accent-foreground' : ''}>{event.status}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
