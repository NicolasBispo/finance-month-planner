import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationButtonProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationButton = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant="outline"
    size={size}
    disabled={isActive}
    className={cn(
      className,
      "h-10 w-10 flex items-center justify-center border-typography/60 text-typography/80 hover:bg-primary hover:border-white hover:text-white transition-colors",
      {
        "bg-primary text-typography !opacity-100": isActive,
      }
    )}
    {...props}
  />
);
PaginationButton.displayName = "PaginationButton";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="icon"
    className={cn("gap-1 p-0", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationButton>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="icon"
    className={cn("gap-1 p-0", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationGroup = ({
  prevPage,
  nextPage,
  totalPages,
  onChange,
  page,
  isLoadingData,
}: {
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  onChange?: (page: number) => void;
  page?: number;
  isLoadingData: boolean;
}) => {
  const searchParams = useSearchParams();
  const currentPage = page || Number(searchParams.get("page")) || 1;
  const pathname = usePathname();
  const { push } = useRouter();
  const changePage = (page: number) => {
    if (onChange) {
      onChange(page);
      return;
    }
    const query = new URLSearchParams(searchParams);
    query.set("page", page.toString());
    const url = `${pathname}?${query.toString()}`;
    push(url);
  };
  const pages = React.useMemo(() => {
    const pages = [];
    const startPage =
      currentPage <= 3
        ? 1
        : currentPage >= totalPages - 2
        ? Math.max(totalPages - 4, 1)
        : currentPage - 2;

    const endPage =
      currentPage <= 3
        ? Math.min(5, totalPages)
        : currentPage >= totalPages - 2
        ? totalPages
        : currentPage + 2;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={prevPage === null}
            onClick={() => changePage(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationButton
              onClick={() => changePage(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationButton>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => changePage(currentPage + 1)}
            disabled={nextPage === null || isLoadingData}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

PaginationGroup.displayName = "PaginationGroup";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  PaginationGroup,
};
