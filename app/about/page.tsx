"use client";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
import { Chatbot } from "../components/chatbot";
import { GitHubContributions } from "../components/github-contributions";

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
									I am a recent undergraduate graduate and current master's student specializing in computer science with a focus on
									cybersecurity. My personal interests lie in intrusion detection systems, red teaming, hardware and full stack development.
								</p>
								<p>
									Apart from acedemics, I have been an active member of various computing clubs and organizations, where I have honed my skills in collaborative projects and leadership roles.
									I served as the founding president of the largest computing club at my university and the chair of ACM chapter at Hofstra, continuing a legacy of 50 years.
								</p>
							</div>
						</div>
					</Card>

					{/* Journey Timeline */}
					<Card>
						<div className="p-8 md:p-12">
							<h2 className="text-2xl font-semibold text-zinc-100 mb-6 font-display">
								Work Experience
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
									<div className="text-sm text-zinc-500 mb-1">Present</div>
									<div className="text-zinc-300 font-medium">Student IT Technician</div>
									<div className="text-zinc-400 text-sm mt-1">
										3 years at Muarice A. Deane School of Law at Hofstra University
									</div>
								</div>

								<div className="relative pl-8 border-l-2 border-zinc-800">
									<div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[7px] top-1"></div>
									<div className="text-sm text-zinc-500 mb-1">Present</div>
									<div className="text-zinc-300 font-medium">Tutor and Teaching Assistant</div>
									<div className="text-zinc-400 text-sm mt-1">
										1 year tutoring and assisting in computer science courses
									</div>
								</div>
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
										Zero Knowledge Proof Systems
									</li>
									<li className="flex items-start">
										Hardware Acceleration (FPGA/GPU)
									</li>
									<li className="flex items-start">
										Cryptographic Protocols
									</li>
									<li className="flex items-start">
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
										Cryptography & Security
									</li>
									<li className="flex items-start">
										Systems and Embedded Programming
									</li>
									<li className="flex items-start">
										Hardware and circuit design
									</li>
									<li className="flex items-start">
										Full Stack Development
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
									the optimal balance between speed and accuracy, working alongside Dr. Xiang Fu.
								</p>
								<p>
									I also work as a Student IT Technician, working on various projects including upgrading and deploying new systems to improve campus security and efficiency.
									Along with that, I am work as a Computer Science tutor and teaching assistant, helping fellow students grasp complex concepts and excel in their studies.
								</p>
							</div>
						</div>
					</Card>


					{/* GitHub Contributions */}
					<Card>
						<div className="p-8 md:p-12">
							<h2 className="text-2xl font-semibold text-zinc-100 mb-6 font-display">
								GitHub Activity
							</h2>
							<GitHubContributions username="raham24" />
						</div>
					</Card>
				</div>
			</div>
			<Chatbot />
		</div>
	);
}
