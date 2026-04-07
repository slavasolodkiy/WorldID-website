/**
 * Frontend smoke tests — verify components render without crashing.
 * Usage: pnpm --filter @workspace/world-tfh run test
 */
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock wouter
vi.mock("wouter", () => ({
  Link: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  useLocation: () => ["/", () => {}],
  Switch: ({ children }: any) => <>{children}</>,
  Route: ({ component: Comp }: any) => (Comp ? <Comp /> : null),
  Router: ({ children }: any) => <>{children}</>,
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => [null, true],
  useAnimation: () => ({ start: vi.fn() }),
}));

// Mock API hooks
vi.mock("@workspace/api-client-react", () => ({
  useGetStats: () => ({ data: undefined, isLoading: true, isError: false, refetch: vi.fn() }),
  getGetStatsQueryKey: () => ["stats"],
  useListEcosystemApps: () => ({ data: undefined, isLoading: true, isError: false, refetch: vi.fn() }),
  getListEcosystemAppsQueryKey: () => ["ecosystem"],
  useGetOrbInfo: () => ({ data: undefined, isLoading: true, isError: false, refetch: vi.fn() }),
  getGetOrbInfoQueryKey: () => ["orb"],
  useListOrbLocations: () => ({ data: undefined, isLoading: true, isError: false, refetch: vi.fn() }),
  getListOrbLocationsQueryKey: () => ["locations"],
  useListTeamMembers: () => ({ data: undefined, isLoading: true, isError: false, refetch: vi.fn() }),
  getListTeamMembersQueryKey: () => ["team"],
  useSubscribeNewsletter: () => ({ mutate: vi.fn(), isPending: false }),
  useHealthCheck: () => ({ data: undefined, isLoading: false, isError: false }),
  getHealthCheckQueryKey: () => ["health"],
}));

import { ApiState } from "../components/ui/ApiState";

// ── ApiState component ─────────────────────────────────────────────────────────
describe("ApiState", () => {
  it("renders loading skeleton when isLoading=true", () => {
    const { container } = render(
      <ApiState data={undefined} isLoading={true} isError={false}>
        {() => <div>Content</div>}
      </ApiState>
    );
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
  });

  it("renders error state when isError=true", () => {
    render(
      <ApiState data={undefined} isLoading={false} isError={true} onRetry={() => {}}>
        {() => <div>Content</div>}
      </ApiState>
    );
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("renders children when data is provided", () => {
    render(
      <ApiState data={{ value: "hello" }} isLoading={false} isError={false}>
        {(d) => <div>{d.value}</div>}
      </ApiState>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders empty state for empty array", () => {
    render(
      <ApiState data={[]} isLoading={false} isError={false}>
        {() => <div>Items</div>}
      </ApiState>
    );
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  it("renders custom empty state", () => {
    render(
      <ApiState
        data={[]}
        isLoading={false}
        isError={false}
        empty={<div>Custom empty</div>}
      >
        {() => <div>Items</div>}
      </ApiState>
    );
    expect(screen.getByText("Custom empty")).toBeInTheDocument();
  });
});
