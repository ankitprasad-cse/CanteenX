"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import type { MockFoodItem } from "../../data/mock-menu";

interface FoodCardProps {
  item: MockFoodItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function FoodCard({
  item,
  quantity,
  onAdd,
  onRemove,
}: FoodCardProps) {
  const [imageSrc, setImageSrc] = useState(item.image);

  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-light">
        <Image
          src={imageSrc}
          alt={item.name}
          onError={() => setImageSrc("/food-image-fallback.svg")}
          fill
          sizes="(max-width: 639px) 88vw, (max-width: 1023px) 44vw, 280px"
          loading="lazy"
          unoptimized
          className={`object-cover transition-transform duration-300 ${
            item.available ? "group-hover:scale-[1.02]" : "grayscale opacity-60"
          }`}
        />

        {item.isSpecial && item.available ? (
          <div className="absolute left-3 top-3">
            <Badge variant="special">Special</Badge>
          </div>
        ) : null}

        {!item.available ? (
          <div className="absolute right-3 top-3">
            <Badge variant="unavailable">Sold out</Badge>
          </div>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-[17px] font-semibold leading-6 text-content-primary">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-body-sm leading-5 text-content-secondary">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[17px] font-semibold text-content-primary">
            ₹{item.price}
          </span>

          {!item.available ? (
            <Button size="sm" variant="secondary" disabled>
              Sold out
            </Button>
          ) : quantity === 0 ? (
            <Button size="sm" onClick={onAdd} aria-label={`Add ${item.name}`}>
              <Plus size={16} strokeWidth={2.2} />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-1 rounded-control border border-border bg-surface p-1">
              <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove one ${item.name}`}
                className="grid h-8 w-8 place-items-center rounded-sm text-content-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Minus size={15} />
              </button>
              <span
                className="min-w-6 text-center text-body-sm font-semibold"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={onAdd}
                aria-label={`Add one more ${item.name}`}
                className="grid h-8 w-8 place-items-center rounded-sm text-content-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
