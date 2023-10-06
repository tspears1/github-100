import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRepoData } from '@context/repo-data'
import { formatRank } from '@utils/formatters/card-formatter.js'
import { useScrollLock } from '@hooks/useScrollLock.js'
import '@types/typedef'

import SimpleBar from 'simplebar-react'

const CardPanel = ({ selectedId }) => {
    // Lock Body Scroll on mount.
    useScrollLock()

    const { repos, setSelectedId } = useRepoData()
    const [ currentRepo, setCurrentRepo ] = useState(null)

    const resetSelectedId = () => setSelectedId(null)

    const preventClose = (e) => e.stopPropagation()

    useEffect(() => {
        if (selectedId) {
            const _currentRepo = repos.find(repo => repo.id === selectedId)
            setCurrentRepo(_currentRepo)
        }
    }, [selectedId])

    /** @type {RepositoryData} */
    const { name, description, owner, stars, avatar, index, commits, url } = currentRepo || {}

    const ranking = formatRank(index)

    /** @type {AnimationProps.variants} */
    const motionVariants = {
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'anticipate',
            }
        },
        hide: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
                ease: 'anticipate',
            }
        }
    }

    return (
        <motion.div
            className='screen'
            variants={motionVariants}
            initial='hide'
            animate='show'
            exit='hide'
            onClick={resetSelectedId}
        >
            <motion.article
                className="card-panel"
                whileInView='show'
                onClick={preventClose}
            >
                <div className="card-panel__banner">
                    <div className="card-panel__eyebrow">
                        <div className="card-panel__eyebrow-icon material-symbols-rounded">star</div>
                        <div className="card-panel__eyebrow-text">{ stars?.toLocaleString() }</div>
                    </div>
                    <div className="card-panel__avatar">
                        <img className="lazyload" src={ avatar } alt={ owner } />
                    </div>
                </div>
                <div className="card-panel__header">
                    <div className="card-panel__author">
                        { owner }
                    </div>
                    <h2 className="card-panel__title">
                        { name }
                    </h2>
                </div>
                <div className="card-panel__description">{ description }</div>
                <h3 className="card-panel__commits-title">
                    Recent Commits { commits?.length > 0 && (<span>{`[ ${commits.length} ]`}</span>) }
                </h3>
                <SimpleBar forceVisible='y' autoHide={false} className={ commits?.length > 0 ? 'simplebar-active' : ''}>
                    <div className="card-panel__commits">
                        <ul className="card-panel__commits-list">
                            {commits?.length > 0 &&
                                commits.map(commit => (
                                    <li className="commit" key={commit.sha}>
                                        <div className="commit__header">
                                            <div className="commit__meta">
                                                {commit.avatar && (
                                                    <div className="commit__avatar">
                                                        <img className="lazyload" src={commit.avatar} alt={commit.author} />
                                                    </div>
                                                )}
                                                <div className="commit__meta-wrapper">
                                                    <div className="commit__author">{commit.author}</div>
                                                    <div className="commit__date"><span>committed </span>{commit.hours}</div>
                                                </div>
                                            </div>
                                            <div className="commit__meta">
                                                <div className="commit__sha">{commit.shortSha}</div>
                                                <a className="commit__link button button--outline" href={commit.url} target='_blank'>
                                                    <span className="sr-only">View Commit {commit.shortSha} on Github</span>
                                                    <span className="card-panel__commits-link-icon material-symbols-rounded">code</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="commit__body">
                                            <div className="commit__message">{commit.message}</div>
                                        </div>
                                    </li>
                                ))
                            }
                            {commits?.length === 0 && (
                                <li className="commit">
                                    <div className="commit__message">No recent commits.</div>
                                </li>
                            )}
                            {!commits && (
                                <li className="commit">
                                    <div className="commit__message">Loading...</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </SimpleBar>
                <div className="card-panel__footer">
                    <div className="card-panel__ranking">
                        { ranking }
                    </div>
                    <div className="card-panel__actions">
                        <a href={url} target='_blank' className="card-panel__link button">
                            <span className="sr-only">View Repo</span>
                            <span className="card-panel__button-icon material-symbols-rounded">open_in_new</span>
                            <tool-tip tip-position="block-start">View Repo</tool-tip>
                        </a>

                        <button
                            className="card-panel__button button button--outline"
                            title="Close Repo Details"
                            onClick={resetSelectedId}
                        >
                            <span className="sr-only">Close Repo Details</span>
                            <span className="card-panel__button-icon material-symbols-rounded">close</span>
                            <tool-tip tip-position="block-start">Close</tool-tip>
                        </button>
                    </div>
                </div>
            </motion.article>
        </motion.div>
    )
}

export default CardPanel