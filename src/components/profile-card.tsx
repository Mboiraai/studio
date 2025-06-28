
"use client";

import { Profile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AnimatePresence, motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Briefcase, GraduationCap, ChevronUp, Gem, Ruler, Sparkles } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSwipe: () => void;
  isTop: boolean;
}

export function ProfileCard({ profile, onSwipe, isTop }: ProfileCardProps) {
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (isExpanded) return; // Don't swipe when card is expanded
    if (Math.abs(info.offset.x) > 100) {
      controls.start({
        x: info.offset.x > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 }
      }).then(() => {
        onSwipe();
        setIsExpanded(false); // Reset state on swipe
      });
    } else {
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      });
    }
  };
  
  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className="absolute w-full h-full"
      style={{ 
        x, 
        rotate,
        opacity: isTop ? 1 : opacity,
        zIndex: isTop ? 10 : 1,
        transform: isTop ? 'none' : 'scale(0.95) translateY(20px)',
      }}
      drag={isTop && !isExpanded ? "x" : false} // Only allow dragging when not expanded
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileTap={{ cursor: "grabbing" }}
    >
      <Card className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 right-8 text-green-500 font-bold text-4xl border-4 border-green-500 px-4 py-2 rounded-lg -rotate-12 z-10">
          LIKE
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 left-8 text-destructive font-bold text-4xl border-4 border-destructive px-4 py-2 rounded-lg rotate-12 z-10">
          NOPE
        </motion.div>

        <Carousel className="w-full h-full" opts={{ draggable: false }}>
          <CarouselContent>
            {profile.images.map((img, index) => (
              <CarouselItem key={index}>
                <Image
                  src={img}
                  alt={`${profile.name}'s photo ${index + 1}`}
                  fill
                  className="object-cover"
                  data-ai-hint="person portrait"
                  priority={isTop}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>

        <div 
          onPointerDownCapture={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0"
        >
          <motion.div 
            className="bg-gradient-to-t from-black/95 via-black/80 to-transparent"
            animate={{ height: isExpanded ? '80%' : 'auto' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={`p-4 md:p-6 overflow-y-auto h-full ${isExpanded ? 'max-h-[75vh]' : 'max-h-[35vh]'}`}>
              <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl md:text-4xl font-bold text-white shadow-md">
                    {profile.name}, <span className="font-light">{profile.age}</span>
                  </h2>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="p-2 -mr-2 shrink-0">
                      <ChevronUp className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                <p className={`text-white/90 mt-1 shadow-md md:text-lg transition-all ${!isExpanded ? 'line-clamp-2' : ''}`}>
                    {profile.bio}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/20">
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-white/30 text-white border-0 backdrop-blur-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 gap-x-4 gap-y-3 text-white/90 text-sm mt-4"
                    >
                        {profile.occupation && <div className="flex items-center gap-2 truncate"><Briefcase size={16} /><span>{profile.occupation}</span></div>}
                        {profile.education && <div className="flex items-center gap-2 truncate"><GraduationCap size={16} /><span>{profile.education}</span></div>}
                        {profile.height && <div className="flex items-center gap-2 truncate"><Ruler size={16} /><span>{profile.height}</span></div>}
                        {profile.relationshipIntent && <div className="flex items-center gap-2 truncate"><Sparkles size={16} /><span>Looking for {profile.relationshipIntent.toLowerCase()}</span></div>}
                        {profile.zodiac && <div className="flex items-center gap-2 truncate"><Gem size={16} /><span>{profile.zodiac}</span></div>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
