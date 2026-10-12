import { Link } from "react-router-dom";
import { FilmIcon } from "./icons";

// ---------------------------------------------------------- loading -------

function CardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton aspect-2/3 rounded-xl" />
      <div className="skeleton mt-3 h-3.5 w-4/5 rounded" />
      <div className="skeleton mt-2 h-3 w-1/2 rounded" />
    </div>
  );
}

export function GridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading movies"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div role="status" aria-label="Loading movies">
      <div className="skeleton mb-4 h-6 w-48 rounded" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="w-36 shrink-0 sm:w-44 lg:w-48">
            <CardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div aria-hidden="true" className="skeleton h-104 rounded-3xl md:h-88" />
  );
}

// ------------------------------------------------------- empty / error ----

function Panel({ icon, title, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-line bg-surface px-8 py-14 text-center">
      <div className="mb-5 grid size-14 place-items-center rounded-full bg-raised text-muted">
        {icon}
      </div>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

const buttonClasses =
  "mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover";

export function EmptyState({ title, children, actionTo, actionLabel }) {
  return (
    <Panel icon={<FilmIcon className="size-6" />} title={title}>
      {children}
      {actionTo && (
        <div>
          <Link to={actionTo} className={buttonClasses}>
            {actionLabel}
          </Link>
        </div>
      )}
    </Panel>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div role="alert">
      <Panel
        icon={<span className="text-xl font-bold text-accent">!</span>}
        title="Couldn't load movies"
      >
        {error?.message ?? "Something went wrong."}
        {onRetry && (
          <div>
            <button type="button" onClick={onRetry} className={buttonClasses}>
              Try again
            </button>
          </div>
        )}
      </Panel>
    </div>
  );
}
