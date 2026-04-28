import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<main
			style={{
				padding: "40px",
				minHeight: "100vh",
				background: "var(--ice-white)",
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "16px",
			}}
		>
			<h1 style={{ color: "var(--ctech-blue)", margin: 0 }}>Bem-vindo à C-Tech Soluções</h1>
			<p style={{ maxWidth: 680 }}>
				Sua loja online de tecnologia, oferecendo os melhores produtos com qualidade e preços competitivos. Explore nossa seleção de gadgets, acessórios e muito mais para atender todas as suas necessidades tecnológicas.
			</p>

			<div style={{ display: "flex", gap: "12px" }}>
				<Link
					to="/produtos"
					style={{
						background: "var(--ctech-blue)",
						color: "#fff",
						padding: "10px 16px",
						borderRadius: 8,
						textDecoration: "none",
						fontWeight: "600",
					}}
				>
					Ver Produtos
				</Link>

				<Link
					to="/conta"
					style={{
						background: "var(--card-bg)",
						color: "var(--text-dark)",
						padding: "10px 16px",
						borderRadius: 8,
						textDecoration: "none",
						fontWeight: "600",
					}}
				>
					Minha Conta
				</Link>
			</div>
		</main>
	);
}
