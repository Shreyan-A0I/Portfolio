import dynamic from "next/dynamic";

const Scene = dynamic(() => import('@/components/3d/Scene'), {
	ssr: false,
	loading: () => <p>Loading...</p>
});

const test = () => {
	return (
		<main className='relative h-screen bg-white'>
			<Scene />
		</main>
	)
};

export default test;