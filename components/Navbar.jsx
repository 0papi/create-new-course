import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LogoBlack from '../../assets/icons/logo-nav.svg'
import LogoWhite from '../../assets/icons/logo-white.svg'

import * as ga from '../../lib/ga/index'
import * as fbq from '../../lib/fpixel'

import styles from '../styles/navbar.module.css'


const links = [
	{
		id: 1,
		target: '/',
		text: 'home',
		active: true,
	},
	{
		id: 2,
		target: '/pricing',
		text: 'pricing',
		active: false,
	},
	{
		id: 3,
		target: '/company',
		text: 'company',
		active: false,
	},
	{
		id: 4,
		target: '/blog',
		text: 'blog',
		active: false,
	},
	{
		id: 5,
		target: '/case-studies',
		text: 'case studies',
		active: false,
	},
	{
		id: 6,
		target: '/products',
		text: 'products',
		active: false,
	},
]

const Navbar = ({ variant = 'primary' }) => {
	const [isOpen, setIsOpen] = React.useState(false)

	const toggleNavbar = () => {
		setIsOpen(!isOpen)
	}

	const signUps = () => {
		ga.event({
			action: 'signups',
		})
		fbq.event('signUps', {
			action: 'signUps',
		})
	}

	const handleClick = () => {
		ga.event({
			action: 'signups',
		})
		fbq.event('signUps', {
			action: 'signUps',
		})
	}

	// computed classes base on variant
	let linkClassName = `${styles.navLink} ${
		variant === 'primary' ? styles.navLinkPrimary : styles.navLinkSecondary
	}`

	let headerClassName = `${styles.navbar} ${
		variant === 'primary' ? styles.navbarPrimary : styles.navbarSecondary
	}`

	let alertClassName = `${styles.alert} ${
		variant === 'primary' ? styles.alertPrimary : styles.alertSecondary
	}`

	let navClassName = `${styles.nav} ${
		variant === 'primary' ? styles.mobileNavPrimary : styles.mobileNavSecondary
	}`

	let barClassName = `${styles.bar} ${
		variant === 'primary' ? styles.barPrimary : styles.barSecondary
	}`

	let closeClassName = `${styles.bar} ${
		variant === 'primary' ? styles.closePrimary : styles.closeSecondary
	}`

	let linkButtonClass = `${styles.linkButton} ${
		variant === 'primary'
			? styles.linkButtonPrimary
			: styles.linkButtonSecondary
	}`

	let contentClassName = `${styles.content} ${
		variant === 'primary' ? styles.contentPrimary : styles.contentSecondary
	}`

	return (
		<>
			{!isOpen && (
				<div className={`${alertClassName}`}>
					New product alert: Klas for Teams is now live 🎉.{' '}
					<a
						href="https://medium.com/@Klas./introducing-klas-for-teams-3a1587e89987"
						target="_blank"
						rel="noreferrer"
					>
						Learn More!
					</a>
				</div>
			)}

			<div className={headerClassName}>
				<div className={styles.container}>
					<Link href="/">
						<a>{variant === 'primary' ? <LogoWhite /> : <LogoBlack />}</a>
					</Link>

					{!isOpen ? (
						<div
							className={`${styles.hamburgerMenu} ${
								isOpen && styles.hamburgerFixed
							}`}
							onClick={toggleNavbar}
						>
							<div className={styles.hamburger} data-isopen={isOpen}>
								<span className={barClassName} data-isopen={isOpen}></span>
								<span className={barClassName} data-isopen={isOpen}></span>
							</div>
						</div>
					) : (
						<div
							className={`${styles.hamburgerMenu} ${
								isOpen && styles.hamburgerFixed
							}`}
							onClick={toggleNavbar}
						>
							<div className={styles.hamburger} data-isopen={isOpen}>
								<span className={closeClassName} data-isopen={isOpen}></span>
								<span className={closeClassName} data-isopen={isOpen}></span>
							</div>
						</div>
					)}

					<nav className={`${navClassName} ${isOpen && styles.showNav}`}>
						<ul className={`${styles.navList} ${styles.firstList}`}>
							{links.map((link) => {
								return link.target === '/products' ? (
									<li key={link.id} className={styles.dropdown}>
										<div className={styles.dropdownBtn}>
											<span className={linkClassName}>{link.text}</span>
										</div>

										<div className={styles.dropdownContent}>
											<div className={contentClassName}>
												<Link href={`/products`}>
													<a>Klas API</a>
												</Link>
												{/* <Link href={`${link.target}/room`}>
													<a href="">Klas Room</a>
												</Link>
												<Link href={`${link.target}/quiz`}>
													<a href="">Klas Quiz</a>
												</Link> */}
											</div>
										</div>
									</li>
								) : (
									<li key={link.id}>
										<Link href={link.target}>
											<a
												className={
													linkClassName + `${link.active ? ' active-link' : ''}`
												}
											>
												{link.text}
											</a>
										</Link>
									</li>
								)
							})}
						</ul>

						<ul className={`${styles.navList} ${styles.secondList}`}>
							<li>
								<Link href="https://app.tryklas.com">
									<a onClick={() => handleClick()} className={linkClassName}>
										Login
									</a>
								</Link>
							</li>
							<Link href="https://app.tryklas.com">
								<a
									onClick={() => handleClick()}
									className={`${linkButtonClass}`}
								>
									Sign up
								</a>
							</Link>
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}

export default Navbar
