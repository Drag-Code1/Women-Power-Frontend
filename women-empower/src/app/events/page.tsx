// "use Server";
import React  from "react";
// import { eventsData } from "../data/eventsData";
import EventCard from "../component/cart/EventCard";
import EventFilters from "../component/product/EventFilters";
import FeaturedEventsSlider from "../component/product/FeaturedEventsSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchEvents, fetchFeaturedEvents } from "../lib/api";
import { Event }  from "../data/eventsData";
// ✅ Memoize EventCard so it doesn’t re-render unnecessarily
const MemoizedEventCard = React.memo(EventCard);




const EventsSection = async({ searchParams }: { searchParams: { 'event-category'?: string,'event-type':string,'event-status':string } }) => {
  const featuredEvents= fetchFeaturedEvents();
  let events= fetchEvents();
  //
  const[featuredEventData,eventData] = await Promise.allSettled([featuredEvents,events]);
const featuredEventsArr = featuredEventData.status === "fulfilled" ? featuredEventData.value : [];
let eventsArr = eventData.status === "fulfilled" ? eventData.value : [];

   const eventCategory = searchParams['event-category'] || 'All';
  const eventType = searchParams['event-type'] || 'All';
  const eventStatus = searchParams['event-status'] || 'All';
// console.log(eventCategory,eventType,eventStatus,"searchParams");

function filterEvents(eventCategory:string,eventType:string,eventStatus:string,events:Event[]){
return events=events.filter(event=>{if(eventCategory==="All"){
 return event

 }else{

 return event.category===eventCategory
 }}).filter(event=>{if(eventType==="All"){
 return event
 }  
  else{
  return  event.type===eventType
  }
}).filter(event=>{if(eventStatus==="All"){
 return event
 }
  else{
 return   event.status===eventStatus
  }
})
 
}

  eventsArr=filterEvents(eventCategory,eventType,eventStatus,eventsArr);



// console.log(featuredEventsArr, eventsArr);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="min-h-screen bg-white rounded-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* ✅ Featured Slider */}
          <FeaturedEventsSlider
            featuredEvents={featuredEventsArr}
          
          />

          {/* ✅ Filters */}
          <EventFilters/>

          <h2 className="text-2xl font-bold mb-6">
            All Events & Workshops ({eventData.status === "fulfilled" ? eventData.value.length : 0})
          </h2>

          {/* ✅ Event  grid */}
          <div
            className={`transition-opacity duration-200 `
            //   ${
            //   isTransitioning ? "opacity-50" : "opacity-100"
            // }`
          
          }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {
              eventData.status === "fulfilled" &&  
              eventsArr.map((event:Event) => (
                <div key={event.id} className="animate-fadeIn">
                  <MemoizedEventCard
                    event={event}
                    // formatDate={formatDate}
                    // getStatusColor={getStatusColor}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Pagination */}
        <h3>Pagination goes here</h3>
        </div>
      </section>

    </div>
  );
};

export default EventsSection;

      {/* ✅ Simple fadeIn for fast render */}
      {/* <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style> */}