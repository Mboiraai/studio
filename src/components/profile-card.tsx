
"use client";

import { Profile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

interface ProfileCardProps {
  profile: Profile;
  onSwipe: () => void;
  isTop: boolean;
}

export function ProfileCard({ profile, onSwipe, isTop }: ProfileCardProps) {
  const [isClient, setIsClient] = useState(false);
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
    if (Math.abs(info.offset.x) > 100) {
      controls.start({
        x: info.offset.x > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 }
      }).then(() => {
        onSwipe();
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
      drag={isTop ? "x" : false}
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

        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 flex flex-col justify-end">
          <h2 className="text-3xl md:text-4xl font-bold text-white shadow-md">
            {profile.name}, <span className="font-light">{profile.age}</span>
          </h2>
          <p className="text-white/90 mt-1 line-clamp-2 shadow-md md:text-lg">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="bg-white/30 text-white border-0 backdrop-blur-sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
