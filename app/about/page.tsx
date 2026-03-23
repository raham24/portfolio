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
					<div className="text-center space-y-4 animate-fade-in-fast" style={{ animationDelay: "0s", animationFillMode: "both" }}>
						<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display">
							About Me
						</h1>
						<div className="w-24 h-px mx-auto bg-gradient-to-r from-zinc-500/0 via-zinc-500 to-zinc-500/0" />
					<p className="text-zinc-400">CS grad student, security researcher, and builder.</p>
					</div>

					{/* Bio Section */}
					<div className="animate-fade-in-fast" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
						<Card>
							<div className="p-8 md:p-12">
								<h2 className="text-2xl font-semibold text-zinc-100 mb-4 font-display">
									Who I Am
								</h2>
								<div className="space-y-4 text-zinc-400 leading-relaxed">
									<p>
										I'm a recent CS graduate now pursuing my master's degree, with a focus on cybersecurity. My interests span intrusion detection, red teaming, hardware design, and full-stack development, particularly where low-level thinking and real-world impact intersect.
									</p>
									<p>
										Outside of academics, I've been deeply involved in the computing community on campus. I founded and served as the first president of the largest computing club at my university, and chaired the ACM chapter at Hofstra, an organization with over 50 years of history. These roles shaped how I think about collaboration, leadership, and building things that last.
									</p>
								</div>
							</div>
						</Card>
					</div>

					{/* Journey Timeline */}
					<div className="animate-fade-in-fast" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
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
										<div className="text-zinc-300 font-medium">Senior Student IT Technician</div>
										<div className="text-zinc-400 text-sm mt-1">
											3 years at Maurice A. Deane School of Law at Hofstra University
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
					</div>

					{/* Skills Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-fast" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
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
					<div className="animate-fade-in-fast" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
						<Card>
							<div className="p-8 md:p-12">
								<h2 className="text-2xl font-semibold text-zinc-100 mb-4 font-display">
									What I'm Working On
								</h2>
								<div className="text-zinc-400 leading-relaxed">
									<p className="mb-4">
										My master's thesis focuses on hardware acceleration for Zero Knowledge Proof systems, benchmarking GPU and FPGA implementations to find the optimal balance between performance and correctness, in collaboration with Dr. Xiang Fu.
									</p>
									<p>
										I also serve as a Senior Student IT Technician at the Maurice A. Deane School of Law, where I've led projects to upgrade and deploy systems that improve campus security and operational efficiency. Alongside that, I tutor and TA for computer science courses, helping students build intuition for concepts that don't always come easy.
									</p>
								</div>
							</div>
						</Card>
					</div>

					{/* GitHub Contributions */}
					<div className="animate-fade-in-fast" style={{ animationDelay: "0.75s", animationFillMode: "both" }}>
						<Card>
							<div className="p-8 md:p-12">
								<h2 className="text-2xl font-semibold text-zinc-100 mb-6 font-display">
									GitHub Activity
								</h2>
								<GitHubContributions username="raham24" />
							</div>
						</Card>
					</div>

					{/* Resume Download */}
					<div className="text-center py-8 animate-fade-in-fast" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>
						<a
							href="/resume.pdf"
							download="Raham_Butt_Resume.pdf"
							className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all duration-200 text-zinc-100 font-medium"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							Download Resume
						</a>
					</div>
				</div>
			</div>
			{/* <Chatbot /> */}
		</div>
	);
}
