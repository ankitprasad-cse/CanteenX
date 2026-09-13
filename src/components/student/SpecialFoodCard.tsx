"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import type { MockFoodItem } from "../../data/mock-menu";

interface SpecialFoodCardProps {
  item: MockFoodItem;
  quantity: number;
  onAdd: () => void;
}

export function SpecialFoodCard({
  item,
  quantity,
  onAdd,
}: SpecialFoodCardProps) {
  const [imageSrc, setImageSrc] = useState(item.image);

  return (
    <Card className="overflow-hidden border-accent/30 bg-surface p-0">
      <div className="grid md:grid-cols-[minmax(0,1.05fr)_minmax(280px,.95fr)]">
        <div className="relative min-h-52 md:min-h-[300px]">
          <Image
            src={imageSrc}
            alt={item.name}
            onError={() => setImageSrc("/food-image-fallback.svg")}
            fill
            priority
            fetchPriority="high"
            unoptimized
            sizes="(max-width: 767px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8">
          <Badge variant="special" className="w-fit">
            Today&apos;s Special
          </Badge>
          <h3 className="mt-4 text-page-heading font-semibold text-content-primary">
            {item.name}
          </h3>
          <p className="mt-2 max-w-md text-body leading-6 text-content-secondary">
            {item.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-[22px] font-semibold text-content-primary">
              ₹{item.price}
            </span>

            {item.available ? (
              <Button onClick={onAdd}>
                <Plus size={17} />
                {quantity > 0 ? `Added · ${quantity}` : "Add to order"}
              </Button>
            ) : (
              <Button disabled variant="secondary">
                Sold out
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
