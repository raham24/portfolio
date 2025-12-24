"use client";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
import { Chatbot } from "../components/chatbot";

export default function About() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10"
				quantity={50}
			/>
			<div className="container min-h-screen px-4 mx-auto py-32">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* Header Section */}
					<div className="text-center space-y-4 animate-fade-in-fast">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display">
							About Me
						</h1>
						<div className="w-24 h-px mx-auto bg-gradient-to-r from-zinc-500/0 via-zinc-500 to-zinc-500/0" />
					</div>

					{/* Bio Section */}
					<Card>
						<div className="p-8 md:p-12">
							<h2 className="text-2xl font-semibold text-zinc-100 mb-4 font-display">
								Who I Am
							</h2>
							<div className="space-y-4 text-zinc-400 leading-relaxed">
								<p>
									I'm a passionate developer and researcher focused on building innovative solutions
									at the intersection of hardware and software. Currently pursuing my master's degree,
									I explore cutting-edge technologies in cryptography and hardware acceleration.
								</p>
								<p>
									When I'm not deep in code or research papers, I enjoy building things and hacking things—
									finding creative solutions to complex problems and pushing the boundaries of what's possible.
								</p>
							</div>
						</div>
					</Card>

					{/* Skills Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<div className="p-6 md:p-8 h-full">
								<h3 className="text-xl font-semibold text-zinc-100 mb-4 font-display">
									Research Interests
								</h3>
								<ul className="space-y-2 text-zinc-400">
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Zero Knowledge Proof Systems
									</li>
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Hardware Acceleration (FPGA/GPU)
									</li>
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Cryptographic Protocols
									</li>
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Distributed Systems
									</li>
								</ul>
							</div>
						</Card>

						<Card>
							<div className="p-6 md:p-8 h-full">
								<h3 className="text-xl font-semibold text-zinc-100 mb-4 font-display">
									Technical Skills
								</h3>
								<ul className="space-y-2 text-zinc-400">
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Full-Stack Development
									</li>
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Systems Programming
									</li>
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Hardware Design & Verification
									</li>
									<li className="flex items-start">
										<span className="text-zinc-500 mr-2">▹</span>
										Performance Optimization
									</li>
								</ul>
							</div>
						</Card>
					</div>

					{/* Current Focus */}
					<Card>
						<div className="p-8 md:p-12">
							<h2 className="text-2xl font-semibold text-zinc-100 mb-4 font-display">
								What I'm Working On
							</h2>
							<div className="text-zinc-400 leading-relaxed">
								<p className="mb-4">
									Currently, I'm deep into my master's thesis on hardware acceleration for
									Zero Knowledge Proof systems, comparing GPU and FPGA implementations to find
									the optimal balance between speed and accuracy.
								</p>
								<p>
									I'm also exploring new ways to make cryptographic systems more accessible
									and performant, bridging the gap between theoretical cryptography and
									practical implementation.
								</p>
							</div>
						</div>
					</Card>

					{/* Journey Timeline */}
					<Card>
						<div className="p-8 md:p-12">
							<h2 className="text-2xl font-semibold text-zinc-100 mb-6 font-display">
								My Journey
							</h2>
							<div className="space-y-6">
								<div className="relative pl-8 border-l-2 border-zinc-800">
									<div className="absolute w-3 h-3 bg-zinc-600 rounded-full -left-[7px] top-1"></div>
									<div className="text-sm text-zinc-500 mb-1">Present</div>
									<div className="text-zinc-300 font-medium">Master's Student & Researcher</div>
									<div className="text-zinc-400 text-sm mt-1">
										Researching hardware acceleration for ZK proofs
									</div>
								</div>

								<div className="relative pl-8 border-l-2 border-zinc-800">
									<div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[7px] top-1"></div>
									<div className="text-sm text-zinc-500 mb-1">Past</div>
									<div className="text-zinc-300 font-medium">Software Developer</div>
									<div className="text-zinc-400 text-sm mt-1">
										Building scalable systems and exploring new technologies
									</div>
								</div>

								<div className="relative pl-8">
									<div className="absolute w-3 h-3 bg-zinc-800 rounded-full -left-[7px] top-1"></div>
									<div className="text-sm text-zinc-500 mb-1">Earlier</div>
									<div className="text-zinc-300 font-medium">Student & Curious Mind</div>
									<div className="text-zinc-400 text-sm mt-1">
										Fell in love with code and never looked back
									</div>
								</div>
							</div>
						</div>
					</Card>

					{/* Footer Quote */}
					<div className="text-center py-8">
						<p className="text-zinc-500 italic">
							"Building the future, one commit at a time"
						</p>
					</div>
				</div>
			</div>
			<Chatbot />
		</div>
	);
}
