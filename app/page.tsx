"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Lenis from "lenis";
import {
  Users, CreditCard, BarChart, Settings, Calendar, Bell,
  Dumbbell, Utensils, TrendingUp, MessageCircle, ClipboardList,
  Activity, Lock, Check, Zap, Target, Facebook, Instagram, Linkedin
} from "lucide-react";
import "./home.css";

const roleData = {
  owner: [
    { i: <Users size={22} />, t: 'Member Management', d: 'Full member profiles, plan history, attendance records, and expiry alerts — all in one view.' },
    { i: <CreditCard size={22} />, t: 'Payment Dashboard', d: 'Track collections, pending dues, and revenue trends. Automated reminders so you never chase manually.' },
    { i: <BarChart size={22} />, t: 'Business Analytics', d: 'Revenue charts, renewal rates, peak hours, and trainer performance — everything you need to scale.' },
    { i: <Settings size={22} />, t: 'Subscription Plans', d: 'Create and manage monthly, quarterly, or annual plans. Price them your way.' },
    { i: <Calendar size={22} />, t: 'Attendance Tracking', d: 'Auto-log daily attendance. Spot members at risk of dropping off before they do.' },
    { i: <Bell size={22} />, t: 'Smart Notifications', d: 'Automated dues reminders, expiry alerts, and renewal prompts sent directly to members.' }
  ],
  trainer: [
    { i: <Dumbbell size={22} />, t: 'Workout Plan Builder', d: 'Create custom workout plans per client — exercises, sets, reps, and rest times in a clean interface.' },
    { i: <Utensils size={22} />, t: 'Diet Plan Creator', d: 'Build personalised nutrition plans. Track macros and meal schedules for every client.' },
    { i: <TrendingUp size={22} />, t: 'Progress Tracking', d: "Monitor each client's strength, weight, and body composition over time with visual charts." },
    { i: <MessageCircle size={22} />, t: 'Client Communication', d: 'Message your clients, share plan updates, and send feedback directly within the platform.' },
    { i: <Calendar size={22} />, t: 'Schedule Management', d: 'Manage your sessions, set availability, and avoid double bookings effortlessly.' },
    { i: <ClipboardList size={22} />, t: 'Client Overview', d: 'See all your assigned clients, their current plans, and upcoming sessions in one clean view.' }
  ],
  member: [
    { i: <Activity size={22} />, t: 'Workout Tracking', d: 'Follow your assigned plan, log completed sets, and track performance on every exercise.' },
    { i: <Utensils size={22} />, t: 'Diet Tracking', d: 'View your personalised diet plan and log daily meals to stay on track with your goals.' },
    { i: <Calendar size={22} />, t: 'Attendance History', d: 'See your gym check-in history at a glance — stay accountable to your own streak.' },
    { i: <BarChart size={22} />, t: 'Progress Insights', d: 'Visualise your fitness journey — strength gains, weight trends, and goal milestones.' },
    { i: <Lock size={22} />, t: 'Membership Status', d: 'Check your current plan, renewal date, and payment history any time from the app.' },
    { i: <MessageCircle size={22} />, t: 'Trainer Connect', d: 'Message your trainer directly, ask questions, and get feedback on your form and progress.' }
  ]
};

const Home = () => {
  const [activeRole, setActiveRole] = useState<"owner" | "trainer" | "member">("owner");
  const [isFading, setIsFading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureDirection: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const role = typeof window !== 'undefined' ? localStorage.getItem("role") : null;
    const jwt = typeof window !== 'undefined' ? localStorage.getItem("jwt") : null;
    if (role && jwt) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const switchRole = (newRole: "owner" | "trainer" | "member") => {
    if (newRole === activeRole) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveRole(newRole);
      setIsFading(false);
    }, 150);
  };

  return (
    <div className="lp-wrapper">
      <nav>
        <div className="logo gt">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/Logo/GYMION White logo.png" alt="Logo" style={{ width: '110px', height: 'auto' }} />
          </Link>
        </div>
        <ul className="nav-links">
          {/* <li><a href="#problem">Why Gymion</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#howitworks">How it Works</a></li> */}
        </ul>
        {isLoggedIn ? (
          <Link href={`/${userRole}`} className="nav-cta" style={{textDecoration: 'none', color: '#fff'}}>Dashboard</Link>
        ) : (
          <Link href="/login" className="nav-cta" style={{textDecoration: 'none', color: '#fff'}}>Login</Link>
        )}
      </nav>

      <section id="hero">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge fu d1">
            <div className="blink-dot"></div>Launching soon!
          </div>
          <h1 className="fu d2">
            Run Your Gym<br /><span className="gt">on Autopilot.</span>
          </h1>
          <p className="hero-sub fu d3">
            Gymion unifies members, trainers, payments, and workouts into one powerful platform — so you spend less time managing and more time scaling.
          </p>
          <div className="ctas fu d4">
            {isLoggedIn ? (
              <Link href={`/${userRole}`} className="btn-p">Go to Dashboard</Link>
            ) : (
              <Link href="/signup" className="btn-p">Get Started Free</Link>
            )}
            <a href="#problem" className="btn-g" style={{textDecoration: 'none'}}>Book a Demo →</a>
          </div>
          <div className="stats-row fu d5">
            <div className="stat-i">
              <div className="stat-n"><span className="gt">3 min</span></div>
              <div className="stat-l">Setup time</div>
            </div>
            <div className="stat-i">
              <div className="stat-n"><span className="gt">100%</span></div>
              <div className="stat-l">Cloud-based</div>
            </div>
            <div className="stat-i">
              <div className="stat-n"><span className="gt">3 Roles</span></div>
              <div className="stat-l">Owner · Trainer · Member</div>
            </div>
          </div>
            </div>

            <div className="hero-visual">
              <div className="dash-outer fu d5">
                <div className="dash-wrap">
              <div className="dash-topbar">
                <div className="dot dr"></div>
                <div className="dot dy"></div>
                <div className="dot dg"></div>
                <div className="dash-url">gymion.app/dashboard</div>
              </div>
              <div className="dash-body">
                <div className="dash-sb">
                  <div className="sb-logo gt">Gymion</div>
                  <div className="sb-item on">⊞ &nbsp;Dashboard</div>
                  <div className="sb-item">◎ &nbsp;Members</div>
                  <div className="sb-item">◉ &nbsp;Trainers</div>
                  <div className="sb-item">◈ &nbsp;Payments</div>
                  <div className="sb-item">◇ &nbsp;Workouts</div>
                  <div className="sb-item">◆ &nbsp;Analytics</div>
                </div>
                <div className="dash-main">
                  <div className="greet">Good morning, <b>Rahul 👋</b></div>
                  <div className="metrics">
                    <div className="mc">
                      <div className="mc-l">Members</div>
                      <div className="mc-v vp">247</div>
                      <div className="mc-c cu">↑ +12 this month</div>
                    </div>
                    <div className="mc">
                      <div className="mc-l">Revenue</div>
                      <div className="mc-v vg">₹1.4L</div>
                      <div className="mc-c cu">↑ 18% vs last</div>
                    </div>
                    <div className="mc">
                      <div className="mc-l">Dues Pending</div>
                      <div className="mc-v va">₹23K</div>
                      <div className="mc-c cw">⚠ 8 members</div>
                    </div>
                    <div className="mc">
                      <div className="mc-l">Renewal Rate</div>
                      <div className="mc-v vp">94%</div>
                      <div className="mc-c cu">↑ +3% vs prev</div>
                    </div>
                  </div>
                  <div className="charts">
                    <div className="cc">
                      <div className="ct">Revenue — last 7 months</div>
                      <div className="bars">
                        <div className="bar" style={{ height: "20%", background: "linear-gradient(180deg,rgba(124,58,237,0.35),rgba(124,58,237,0.15))" }}></div>
                        <div className="bar" style={{ height: "35%", background: "linear-gradient(180deg,rgba(124,58,237,0.45),rgba(124,58,237,0.25))" }}></div>
                        <div className="bar" style={{ height: "50%", background: "linear-gradient(180deg,rgba(99,102,241,0.55),rgba(99,102,241,0.3))" }}></div>
                        <div className="bar" style={{ height: "62%", background: "linear-gradient(180deg,rgba(59,130,246,0.65),rgba(59,130,246,0.35))" }}></div>
                        <div className="bar" style={{ height: "72%", background: "linear-gradient(180deg,rgba(14,165,233,0.75),rgba(14,165,233,0.45))" }}></div>
                        <div className="bar" style={{ height: "84%", background: "linear-gradient(180deg,rgba(6,182,212,0.85),rgba(6,182,212,0.5))" }}></div>
                        <div className="bar" style={{ height: "96%", background: "linear-gradient(180deg,#34D399,#06B6D4)" }}></div>
                      </div>
                    </div>
                    <div className="cc">
                      <div className="ct">Recent members</div>
                      <div className="mlist">
                        <div className="mrow">
                          <div className="av av1">AR</div>
                          <div className="mi">
                            <div className="mn">Arjun Rao</div>
                            <div className="mp">Premium · 3 months</div>
                          </div>
                          <div className="mb mba">Active</div>
                        </div>
                        <div className="mrow">
                          <div className="av av2">PS</div>
                          <div className="mi">
                            <div className="mn">Priya Shah</div>
                            <div className="mp">Standard · 1 month</div>
                          </div>
                          <div className="mb mbd">Due</div>
                        </div>
                        <div className="mrow">
                          <div className="av av3">KM</div>
                          <div className="mi">
                            <div className="mn">Kiran Mehta</div>
                            <div className="mp">Premium · 6 months</div>
                          </div>
                          <div className="mb mba">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem">
        <div className="container">
          <div className="eyebrow gt">The Problem</div>
          <h2>Running a gym is <span className="gt2">chaotic.</span></h2>
          <p className="sub">Most gym owners are stuck juggling multiple tools, scattered data, and endless manual work — just to keep things running.</p>
          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-bar"></div>
              <div className="pain-t">Late-night payment chasing</div>
              <div className="pain-d">Following up on dues over WhatsApp — manually tracking who paid and who didn&apos;t.</div>
            </div>
            <div className="pain-card">
              <div className="pain-bar"></div>
              <div className="pain-t">No clear view of your members</div>
              <div className="pain-d">Spreadsheets don&apos;t tell you who&apos;s expiring, who might churn, or who your best clients are.</div>
            </div>
            <div className="pain-card">
              <div className="pain-bar"></div>
              <div className="pain-t">Trainers working in silos</div>
              <div className="pain-d">No unified system for workouts, diet plans, or progress — every trainer does things differently.</div>
            </div>
            <div className="pain-card">
              <div className="pain-bar"></div>
              <div className="pain-t">No visibility into growth</div>
              <div className="pain-d">Revenue, retention, and profitability? You&apos;re guessing instead of knowing.</div>
            </div>
            <div className="pain-card">
              <div className="pain-bar"></div>
              <div className="pain-t">Silent member drop-offs</div>
              <div className="pain-d">Without progress tracking, members don&apos;t see results — and quietly leave.</div>
            </div>
            <div className="pain-card">
              <div className="pain-bar"></div>
              <div className="pain-t">Too many tools, no control</div>
              <div className="pain-d">Attendance, payments, workouts — all in different apps that don&apos;t talk to each other.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="solution">
        <div className="container">
          <div className="sol-grid">
            <div className="sol-left-col">
              <div className="eyebrow gt">The Solution</div>
              <h2 style={{ marginBottom: "32px", marginTop: "8px" }}>One platform.<br /><span className="gt">Every role. Every task.</span></h2>
              <div className="sol-pts">
                <div className="sol-pt">
                <div className="sol-ico si-p" style={{ color: '#A78BFA' }}><Lock size={20} /></div>
                <div className="sol-t">
                  <h4>Centralised member database</h4>
                  <p>Every member, plan, and payment in one searchable place — accessible from anywhere.</p>
                </div>
              </div>
              <div className="sol-pt">
                <div className="sol-ico si-b" style={{ color: '#60A5FA' }}><Zap size={20} /></div>
                <div className="sol-t">
                  <h4>Automated payment reminders</h4>
                  <p>Gymion sends dues alerts automatically. You stop chasing, start focusing on growth.</p>
                </div>
              </div>
              <div className="sol-pt">
                <div className="sol-ico si-c" style={{ color: '#06B6D4' }}><Target size={20} /></div>
                <div className="sol-t">
                  <h4>Role-based access</h4>
                  <p>Owners, trainers, and members each see what they need — nothing more, nothing less.</p>
                </div>
              </div>
              <div className="sol-pt">
                <div className="sol-ico si-g" style={{ color: '#10B981' }}><BarChart size={20} /></div>
                <div className="sol-t">
                  <h4>Built-in analytics</h4>
                  <p>Revenue trends, renewal rates, trainer performance — all surfaced automatically.</p>
                </div>
              </div>
            </div>
            </div>
            {/* FLOATING CARD STACK */}
            <div className="card-stage" id="cardStage">
      
              {/* Card 4: Analytics (deepest) */}
              <div className="fcard fcard-analytics">
                <div className="fcard-header">
                  <span className="fcard-title">Analytics</span>
                  <span className="fcard-badge">Live</span>
                </div>
                <div className="fcard-body">
                  <div className="ana-metric">
                    <span className="ana-big">₹1.4L</span>
                    <span className="ana-pill">+18%</span>
                  </div>
                  <div className="ana-label">Revenue this month</div>
                  <div className="ana-line">
                    <div className="abar" style={{height:"30%"}}></div>
                    <div className="abar" style={{height:"45%"}}></div>
                    <div className="abar" style={{height:"55%"}}></div>
                    <div className="abar" style={{height:"62%"}}></div>
                    <div className="abar" style={{height:"74%"}}></div>
                    <div className="abar" style={{height:"85%"}}></div>
                    <div className="abar" style={{height:"100%",background:"linear-gradient(180deg,#34D399,#06B6D4)"}}></div>
                  </div>
                </div>
              </div>
      
              {/* Card 3: Members (behind-left) */}
              <div className="fcard fcard-members">
                <div className="fcard-header">
                  <span className="fcard-title">Members</span>
                  <span className="fcard-badge">247 total</span>
                </div>
                <div className="fcard-body">
                  <div className="mem-row"><div className="mem-av ma1">AR</div><div className="mem-info"><div className="mem-name">Arjun Rao</div><div className="mem-plan">Premium · 3 months</div></div><span className="mem-badge mb-a">Active</span></div>
                  <div className="mem-row"><div className="mem-av ma2">PS</div><div className="mem-info"><div className="mem-name">Priya Shah</div><div className="mem-plan">Standard · Renew soon</div></div><span className="mem-badge mb-e">Expiring</span></div>
                  <div className="mem-row"><div className="mem-av ma3">KM</div><div className="mem-info"><div className="mem-name">Kiran Mehta</div><div className="mem-plan">Premium · 6 months</div></div><span className="mem-badge mb-a">Active</span></div>
                  <div className="mem-row"><div className="mem-av ma4">RV</div><div className="mem-info"><div className="mem-name">Riya Verma</div><div className="mem-plan">Annual · 10 months</div></div><span className="mem-badge mb-a">Active</span></div>
                </div>
              </div>
      
              {/* Card 2: Payments (mid) */}
              <div className="fcard fcard-payments">
                <div className="fcard-header">
                  <span className="fcard-title">Payments</span>
                  <span className="fcard-badge">This month</span>
                </div>
                <div className="fcard-body">
                  <div className="pay-row">
                    <div className="pay-stat"><div className="pay-stat-l">Collected</div><div className="pay-stat-v psv-g">₹1.4L</div></div>
                    <div className="pay-stat"><div className="pay-stat-l">Pending</div><div className="pay-stat-v psv-a">₹23K</div></div>
                  </div>
                  <div className="pay-mini-chart">
                    <div className="pbar" style={{height:"28%",background:"linear-gradient(180deg,rgba(124,58,237,0.5),rgba(124,58,237,0.15))"}}></div>
                    <div className="pbar" style={{height:"42%",background:"linear-gradient(180deg,rgba(99,102,241,0.55),rgba(99,102,241,0.2))"}}></div>
                    <div className="pbar" style={{height:"58%",background:"linear-gradient(180deg,rgba(59,130,246,0.6),rgba(59,130,246,0.2))"}}></div>
                    <div className="pbar" style={{height:"70%",background:"linear-gradient(180deg,rgba(14,165,233,0.65),rgba(14,165,233,0.2))"}}></div>
                    <div className="pbar" style={{height:"82%",background:"linear-gradient(180deg,rgba(6,182,212,0.7),rgba(6,182,212,0.2))"}}></div>
                    <div className="pbar" style={{height:"95%",background:"linear-gradient(180deg,#34D399,rgba(52,211,153,0.3))"}}></div>
                  </div>
                  <div className="pay-txn">
                    <div className="pay-txn-row"><div className="pay-dot" style={{background:"#A78BFA"}}></div><span className="pay-name">Arjun Rao — Premium</span><span className="pay-amt">+₹3,500</span></div>
                    <div className="pay-txn-row"><div className="pay-dot" style={{background:"#34D399"}}></div><span className="pay-name">Kiran Mehta — Premium</span><span className="pay-amt">+₹3,500</span></div>
                    <div className="pay-txn-row"><div className="pay-dot" style={{background:"#FCD34D"}}></div><span className="pay-name">Priya Shah — Standard</span><span className="pay-amt">+₹1,800</span></div>
                  </div>
                </div>
              </div>
      
              {/* Card 1: Workout (front, sharp) */}
              <div className="fcard fcard-workout">
                <div className="fcard-body">
                  <div className="wk-header-bar">
                    <div><div className="wk-title">Today&apos;s Workout — Arjun</div><div className="wk-sub">Day 14 of 30 · Chest &amp; Triceps</div></div>
                  </div>
                  <div className="wk-item">
                    <div className="wk-num">1</div>
                    <div><div className="wk-name">Bench Press</div><div className="wk-sets">4 sets × 10 reps · 60 kg</div></div>
                    <div className="wk-check"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  </div>
                  <div className="wk-item">
                    <div className="wk-num">2</div>
                    <div><div className="wk-name">Incline Dumbbell</div><div className="wk-sets">3 sets × 12 reps · 20 kg</div></div>
                    <div className="wk-check"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  </div>
                  <div className="wk-item">
                    <div className="wk-num">3</div>
                    <div><div className="wk-name">Cable Fly</div><div className="wk-sets">3 sets × 15 reps · 15 kg</div></div>
                    <div className="wk-check" style={{width:"16px",height:"16px",background:"rgba(255,255,255,0.07)",borderRadius:"50%"}}></div>
                  </div>
                  <div className="wk-prog-wrap">
                    <div className="wk-prog-label">
                      <span>Monthly Goal Progress</span>
                      <span className="wk-prog-val">67%</span>
                    </div>
                    <div className="wk-prog-bar"><div className="wk-prog-fill" style={{width:"67%"}}></div></div>
                  </div>
                </div>
              </div>
      
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="features-header">
            <div className="features-title-area">
              <div className="eyebrow gt">Features</div>
              <h2>Built for every role<br />in your <span className="gt">gym.</span></h2>
            </div>
            <div className="role-tog">
              <button
              className={`role-btn ${activeRole === "owner" ? "active" : ""}`}
              onClick={() => switchRole("owner")}
            >
              <Users size={16} style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "4px" }} /> Owner
            </button>
            <button
              className={`role-btn ${activeRole === "trainer" ? "active" : ""}`}
              onClick={() => switchRole("trainer")}
            >
              <Dumbbell size={16} style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "4px" }} /> Trainer
            </button>
            <button
              className={`role-btn ${activeRole === "member" ? "active" : ""}`}
              onClick={() => switchRole("member")}
            >
              <Activity size={16} style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "4px" }} /> Member
            </button>
          </div>
          </div>
          <div
            className="feat-grid"
            style={{
              opacity: isFading ? 0 : 1,
              transform: isFading ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.15s ease-out, transform 0.15s ease-out"
            }}
          >
            {roleData[activeRole].map((feature, idx) => (
              <div key={idx} className="fc">
                <div className="fc-ico" style={{ color: '#A78BFA' }}>{feature.i}</div>
                <div className="fc-t">{feature.t}</div>
                <div className="fc-d">{feature.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="howitworks" className="hiw-section">
        <div className="container">
          <div className="hiw-header">
            <div className="eyebrow gt">Getting Started</div>
            <h2>Set up your gym in <span className="gt">minutes</span></h2>
            <p className="sub">No complex setup. No training required.</p>
          </div>
          <div className="hiw-grid">
            {/* Step 1 */}
            <div className="hiw-card">
              <div className="hiw-num">1</div>
              <div className="hiw-card-content">
                <div className="hiw-card-t">Create your gym</div>
                <div className="hiw-card-d">Sign up and set up your gym profile, branding, and membership plans.</div>
              </div>
              <div className="hiw-ui hiw-ui-1">
                <div className="ui-mock-header">Gym Setup</div>
                <div className="ui-mock-body">
                  <div className="ui-upload-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span>Upload Logo</span>
                  </div>
                  <div className="ui-input-mock"></div>
                  <div className="ui-input-mock short"></div>
                  <div className="ui-btn-mock"></div>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="hiw-card">
              <div className="hiw-num">2</div>
              <div className="hiw-card-content">
                <div className="hiw-card-t">Add team &amp; members</div>
                <div className="hiw-card-d">Invite your team. Members can self-register or be added manually.</div>
              </div>
              <div className="hiw-ui hiw-ui-2">
                <div className="ui-mock-header">Members</div>
                <div className="ui-mock-body p-0">
                  <div className="ui-mem-row">
                    <div className="ui-av av1">A</div><div className="ui-mi"><div className="ui-mn"></div><div className="ui-md"></div></div><div className="ui-tag tag-a">Active</div>
                  </div>
                  <div className="ui-mem-row">
                    <div className="ui-av av2">P</div><div className="ui-mi"><div className="ui-mn"></div><div className="ui-md"></div></div><div className="ui-tag tag-p">Pending</div>
                  </div>
                  <div className="ui-mem-row">
                    <div className="ui-av av3">K</div><div className="ui-mi"><div className="ui-mn"></div><div className="ui-md"></div></div><div className="ui-tag tag-a">Active</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="hiw-card">
              <div className="hiw-num">3</div>
              <div className="hiw-card-content">
                <div className="hiw-card-t">Assign plans</div>
                <div className="hiw-card-d">Trainers build personalised workout and diet plans for each member.</div>
              </div>
              <div className="hiw-ui hiw-ui-3">
                <div className="ui-mock-header">Workout Plan</div>
                <div className="ui-mock-body">
                  <div className="ui-plan-card">
                    <div className="ui-pc-t">Chest &amp; Triceps</div>
                    <div className="ui-pc-chk"><div className="chk-box on"></div><div className="chk-line"></div></div>
                    <div className="ui-pc-chk"><div className="chk-box on"></div><div className="chk-line short"></div></div>
                    <div className="ui-pc-chk"><div className="chk-box"></div><div className="chk-line"></div></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="hiw-card">
              <div className="hiw-num">4</div>
              <div className="hiw-card-content">
                <div className="hiw-card-t">Track everything</div>
                <div className="hiw-card-d">Watch attendance, payments, and progress update in real-time.</div>
              </div>
              <div className="hiw-ui hiw-ui-4">
                <div className="ui-mock-header">Analytics</div>
                <div className="ui-mock-body">
                  <div className="ui-chart-val">₹1.4L <span className="up">↑ 18%</span></div>
                  <div className="ui-bars">
                    <div className="ui-bar" style={{height:"30px"}}></div>
                    <div className="ui-bar" style={{height:"45px"}}></div>
                    <div className="ui-bar" style={{height:"35px"}}></div>
                    <div className="ui-bar" style={{height:"60px"}}></div>
                    <div className="ui-bar" style={{height:"50px"}}></div>
                    <div className="ui-bar" style={{height:"75px", background:"linear-gradient(180deg,#34D399,#06B6D4)"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" style={{display:"none"}}>
        <div className="container">
          <div className="eyebrow gt">Why Gymion</div>
          <h2>Less chaos.<br /><span className="gt">More growth.</span></h2>
          <div className="ben-layout">
            <div className="ben-list">
              <div className="ben-item">
                <div className="ben-check">
                  <Check size={18} strokeWidth={3} style={{ color: '#34D399' }} />
                </div>
                <div className="ben-text">
                  <h4>Save hours every week</h4>
                  <p>Automated billing, reminders, and reports cut manual admin by 80%.</p>
                </div>
              </div>
              <div className="ben-item">
                <div className="ben-check">
                  <Check size={18} strokeWidth={3} style={{ color: '#34D399' }} />
                </div>
                <div className="ben-text">
                  <h4>Increase member retention</h4>
                  <p>Members who track progress stay 3x longer. Gymion makes tracking effortless.</p>
                </div>
              </div>
              <div className="ben-item">
                <div className="ben-check">
                  <Check size={18} strokeWidth={3} style={{ color: '#34D399' }} />
                </div>
                <div className="ben-text">
                  <h4>Empower your trainers</h4>
                  <p>Trainers stop wasting time on admin and spend it building better programs.</p>
                </div>
              </div>
              <div className="ben-item">
                <div className="ben-check">
                  <Check size={18} strokeWidth={3} style={{ color: '#34D399' }} />
                </div>
                <div className="ben-text">
                  <h4>Make smarter decisions</h4>
                  <p>Real analytics help you see what&apos;s working and double down on it.</p>
                </div>
              </div>
              <div className="ben-item">
                <div className="ben-check">
                  <Check size={18} strokeWidth={3} style={{ color: '#34D399' }} />
                </div>
                <div className="ben-text">
                  <h4>Built for Indian gyms</h4>
                  <p>₹ pricing, UPI-ready, designed for the way gyms actually operate in India.</p>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="big-n gt">80%</div>
              <div className="big-l">less time on admin tasks</div>
              <div className="divider"></div>
              <div className="big-n2">3x</div>
              <div className="big-l" style={{ marginTop: "8px" }}>better member retention</div>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" style={{ display: "none" }}>
        <div className="container">
          <div className="eyebrow gt">Traction</div>
          <h2>Gyms are already <span className="gt">onboarding.</span></h2>
          <div className="proof-box">
            <div className="proof-label">Early Access</div>
            <div className="proof-h">Trusted by growing gyms across India</div>
            <div className="proof-s">Join the early cohort and shape what Gymion becomes.</div>
            <div className="proof-avs">
              <div className="pav pav1">RG</div>
              <div className="pav pav2">NK</div>
              <div className="pav pav3">SA</div>
              <div className="pav pav4">MD</div>
              <span className="proof-cnt">+23 gym owners in beta</span>
            </div>
          </div>
        </div>
      </section>

      <section id="final-cta">
        <div className="container">
          <div className="cta-box">
            <div className="cta-orb1"></div>
            <div className="cta-orb2"></div>
            <div className="eyebrow gt" style={{ display: "block", marginBottom: "16px" }}>Start Today</div>
            <h2>Stop managing your gym.<br /><span className="gt">Start growing it.</span></h2>
            <p className="cta-sub">Join the gyms already saving hours every week with Gymion.</p>
            <div className="cta-btns">
              {isLoggedIn ? (
                <Link href={`/${userRole}`} className="btn-p" style={{ padding: "15px 32px", fontSize: "15px" }}>Go to Dashboard</Link>
              ) : (
                <Link href="/signup" className="btn-p" style={{ padding: "15px 32px", fontSize: "15px" }}>Get Started Free</Link>
              )}
              <a href="#problem" className="btn-g" style={{ padding: "15px 32px", fontSize: "15px", textDecoration: "none" }}>Book a Demo →</a>
            </div>
            <p className="no-cc">No credit card required &nbsp;·&nbsp; Setup in 3 minutes &nbsp;·&nbsp; Cancel anytime</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">
          <div className="fc2">© {new Date().getFullYear()} Gymion.</div>
          <div className="fc2 footer-tagline">Built for gym owners who mean business.</div>
        </div>
        <div className="footer-socials">
          <a href="https://www.facebook.com/profile.php?id=61578471362801" target="_blank" rel="noreferrer" className="social-icon">
            <Facebook size={20} />
          </a>
          <a href="https://www.instagram.com/gymion.app" target="_blank" rel="noreferrer" className="social-icon">
            <Instagram size={20} />
          </a>
          <a href="https://www.linkedin.com/company/gymion" target="_blank" rel="noreferrer" className="social-icon">
            <Linkedin size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
