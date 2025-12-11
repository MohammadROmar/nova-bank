import Breadcrumbs from './breadcrumbs';

type PageTitleProps = { title: string };

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <>
      <h2 className="text-heading mb-0.5 text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <Breadcrumbs />
    </>
  );
}
