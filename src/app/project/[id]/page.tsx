import type { Metadata } from 'next';
import ProjectDetailClient from '@/components/ProjectDetailClient';

const getProjectData = (id: string) => {
  const projects: Record<string, any> = {
    '1': {
      id: '1',
      title: 'Concrete Shadows',
      year: '2024',
      location: 'Berlin, Germany',
      type: 'Architectural Study',
      client: 'Independent',
      narrative: 'An exploration of brutalist architecture through the lens of light and shadow. This series captures the raw, unadorned beauty of concrete structures, revealing the poetry hidden within their geometric forms.',
      conclusion: 'In the silence between light and shadow, we find the true essence of architectural poetry.',
      leadImage: '/assets/images/projects/project-1/1-1.png',
    },
    '2': {
      id: '2',
      title: 'The Weight of Memory',
      year: '2024',
      location: 'Paris, France',
      type: 'Still Life',
      client: 'Independent',
      narrative: 'A contemplative study of objects that carry the weight of memory. Each photograph reveals the silent stories embedded within everyday items, transforming the mundane into the profound.',
      conclusion: 'Memory is not in the object, but in the space between what was and what remains.',
      leadImage: '/assets/images/projects/project-2/2-1.png',
    },
    '3': {
      id: '3',
      title: 'Silence and Structure',
      year: '2024',
      location: 'Tokyo, Japan',
      type: 'Architectural Study',
      client: 'Independent',
      narrative: 'A minimalist exploration of architectural forms in urban environments. This series examines the relationship between structure and silence, finding beauty in the spaces between buildings.',
      conclusion: 'True architecture speaks in whispers, not shouts.',
      leadImage: '/assets/images/projects/project-3/3-1.png',
    },
    '4': {
      id: '4',
      title: 'Ephemeral Forms',
      year: '2024',
      location: 'New York, USA',
      type: 'Conceptual',
      client: 'Independent',
      narrative: 'An experimental series exploring the transient nature of visual forms. Through abstract compositions, this work investigates the fleeting moments of perception and the fragility of visual experience.',
      conclusion: 'In the ephemeral, we find the eternal.',
      leadImage: '/assets/images/projects/project-4/4-1.png',
    },
    '5': {
      id: '5',
      title: 'Urban Echoes',
      year: '2023',
      location: 'London, UK',
      type: 'Street Photography',
      client: 'Commission',
      narrative: 'A street photography series capturing the rhythm and pulse of urban life. Through candid moments and architectural details, this work reveals the hidden narratives of city streets.',
      conclusion: 'The city speaks in echoes, if we know how to listen.',
      leadImage: '/assets/images/projects/project-5/5-1.png',
    },
    '6': {
      id: '6',
      title: 'Abstracted Reality',
      year: '2024',
      location: 'Milan, Italy',
      type: 'Experimental',
      client: 'Independent',
      narrative: 'An experimental deconstruction of visual reality through abstract photography. This series challenges conventional perception by fragmenting and reconstructing visual elements.',
      conclusion: 'Reality is not what we see, but what we choose to see.',
      leadImage: '/assets/images/projects/project-6/6-1.png',
    }
  };

  return projects[id] || projects['1'];
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const projectData = getProjectData(params.id);
  
  return {
    title: `${projectData.title} | GapLens Studio Photography Project`,
    description: `${projectData.narrative} Explore ${projectData.title}, a ${projectData.type.toLowerCase()} photography project by GapLens Studio. ${projectData.year} - ${projectData.location}.`,
    keywords: [
      projectData.title.toLowerCase(),
      projectData.type.toLowerCase(),
      'fine art photography',
      'photography project',
      'editorial photography',
      'architectural photography',
      'minimalist photography',
      projectData.location.toLowerCase(),
      projectData.year
    ],
    openGraph: {
      title: `${projectData.title} | GapLens Studio Photography Project`,
      description: `${projectData.narrative} Explore ${projectData.title}, a ${projectData.type.toLowerCase()} photography project by GapLens Studio.`,
      url: `https://gaplens.com/project/${params.id}`,
      images: [
        {
          url: projectData.leadImage,
          width: 1200,
          height: 630,
          alt: `${projectData.title} - GapLens Studio Photography`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${projectData.title} | GapLens Studio Photography Project`,
      description: `${projectData.narrative} Explore ${projectData.title}, a ${projectData.type.toLowerCase()} photography project by GapLens Studio.`,
      images: [projectData.leadImage],
    },
    alternates: {
      canonical: `https://gaplens.com/project/${params.id}`,
    },
  };
}

export default function ProjectDetail() {
  return <ProjectDetailClient />;
}