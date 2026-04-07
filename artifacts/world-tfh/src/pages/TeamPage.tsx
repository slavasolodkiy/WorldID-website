import { useListTeamMembers, getListTeamMembersQueryKey } from "@workspace/api-client-react";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import { ApiState } from "@/components/ui/ApiState";

export function TeamPage() {
  const { data: team, isLoading, isError, refetch } = useListTeamMembers({ query: { queryKey: getListTeamMembersQueryKey() } });

  const getAvatar = (idx: number) => {
    if (idx === 0) return avatar1;
    if (idx === 1) return avatar2;
    return avatar3;
  };

  return (
    <div className="w-full flex flex-col min-h-screen pt-24">
      <section className="px-6 py-20 max-w-6xl mx-auto w-full text-center">
        <h1 className="text-5xl font-bold tracking-tighter mb-6">Leadership</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
          Tools for Humanity is led by a team of engineers, researchers, and builders.
        </p>

        <ApiState data={team} isLoading={isLoading} isError={isError} onRetry={refetch} loadingRows={3}>
          {(members) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, i) => (
                <div key={member.id} className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 text-left">
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={member.avatarUrl || getAvatar(i % 3)}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 relative z-10 bg-gradient-to-t from-card via-card to-transparent -mt-20 pt-20">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm font-medium text-white/70 mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ApiState>
      </section>
    </div>
  );
}
