import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { developerList } from '@/sources/lists/developerList';
import { images as altMessages } from '@/sources/messages/images';
import { AboutUs } from '@/components/aboutUs';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('@/sources/lists/developerList', () => ({
  developerList: [
    {
      nameKey: 'developer1.name',
      photo: 'developer1.jpg',
    },
    {
      nameKey: 'developer2.name',
      photo: 'developer2.jpg',
    },
  ],
}));

vi.mock('@/sources/messages/images', () => ({
  images: {
    developer: 'Developer photo',
  },
}));

vi.mock('./aboutUs.module.css', () => ({
  default: {
    container: 'container',
    developersContainer: 'developersContainer',
    developers: 'developers',
    image: 'image',
    project: 'project',
    course: 'course',
    title: 'title',
    info: 'info',
    courseInfo: 'courseInfo',
  },
}));

describe('AboutUs', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });

    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'developer1.name': 'Developer One',
        'developer2.name': 'Developer Two',
        'aboutUs.project': 'Project description',
        'aboutUs.title': 'Course Title',
        'aboutUs.name': 'Course Name',
        'aboutUs.year': '2024',
      };
      return translations[key] || key;
    });
  });

  it('renders all developers from the list', () => {
    render(<AboutUs />);

    developerList.forEach(developer => {
      expect(screen.getByText(mockT(developer.nameKey))).toBeInTheDocument();
    });
  });

  it('renders developer images with correct attributes', () => {
    render(<AboutUs />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(developerList.length);

    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', developerList[index].photo);
      expect(image).toHaveAttribute('alt', altMessages.developer);
      expect(image).toHaveClass('image');
    });
  });

  it('renders project description', () => {
    render(<AboutUs />);

    const projectText = screen.getByText('Project description');
    expect(projectText).toBeInTheDocument();
    expect(projectText).toHaveClass('project');
  });

  it('renders course information', () => {
    render(<AboutUs />);

    expect(screen.getByText('Course Title')).toBeInTheDocument();
    expect(screen.getByText('Course Title')).toHaveClass('title');

    expect(screen.getByText('Course Name')).toBeInTheDocument();
    expect(screen.getByText('Course Name')).toHaveClass('courseInfo');

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2024')).toHaveClass('courseInfo');
  });

  it('calls translation function with correct keys', () => {
    render(<AboutUs />);

    expect(mockT).toHaveBeenCalledWith('developer1.name');
    expect(mockT).toHaveBeenCalledWith('developer2.name');
    expect(mockT).toHaveBeenCalledWith('aboutUs.project');
    expect(mockT).toHaveBeenCalledWith('aboutUs.title');
    expect(mockT).toHaveBeenCalledWith('aboutUs.name');
    expect(mockT).toHaveBeenCalledWith('aboutUs.year');
  });

  it('applies correct CSS classes to all elements', () => {
    const { container } = render(<AboutUs />);

    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.developersContainer')).toBeInTheDocument();
    expect(container.querySelectorAll('.developers')).toHaveLength(
      developerList.length
    );
    expect(container.querySelectorAll('.image')).toHaveLength(
      developerList.length
    );
    expect(container.querySelector('.project')).toBeInTheDocument();
    expect(container.querySelector('.course')).toBeInTheDocument();
    expect(container.querySelector('.title')).toBeInTheDocument();
    expect(container.querySelector('.info')).toBeInTheDocument();
    expect(container.querySelectorAll('.courseInfo')).toHaveLength(2);
  });

  it('renders correct structure with containers', () => {
    const { container } = render(<AboutUs />);

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('container');

    const developersContainer = screen
      .getByText('Developer One')
      .closest('.developersContainer');
    expect(developersContainer).toBeInTheDocument();

    const courseContainer = screen.getByText('Course Title').closest('.course');
    expect(courseContainer).toBeInTheDocument();

    const infoContainer = screen.getByText('Course Name').closest('.info');
    expect(infoContainer).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<AboutUs />);
    expect(container).toMatchSnapshot();
  });

  it('handles empty developer list', () => {
    vi.mocked(developerList).length = 0;

    render(<AboutUs />);

    const images = screen.queryAllByRole('img');

    expect(images).toHaveLength(0);

    vi.mocked(developerList).length = 2;
  });
});
