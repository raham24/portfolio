"use client";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://linkedin.com/in/rahambutt",
		label: "LinkedIn",
		handle: "Raham Butt",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:rahamriaz@gmail.com",
		label: "Email",
		handle: "rahamriaz@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/raham24",
		label: "Github",
		handle: "Raham",
	},
];

export default function Example() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto gap-12">
				<div className="text-center space-y-4 animate-fade-in-fast" style={{ animationDelay: "0s", animationFillMode: "both" }}>
					<h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display">
						Contact
					</h2>
					<div className="w-24 h-px mx-auto bg-gradient-to-r from-zinc-500/0 via-zinc-500 to-zinc-500/0" />
					<p className="text-zinc-400">
						Reach out through any of these.
					</p>
				</div>

				<div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-3 lg:gap-16 animate-fade-in-fast" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
					{socials.map((s) => (
						<Card key={s.label}>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon}
								</span>{" "}
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
