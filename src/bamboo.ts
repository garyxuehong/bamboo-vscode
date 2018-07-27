"use strict";

import * as vscode from "vscode";

import { findAllPlans } from "./findAllPlans";

import { getBrowsePlanUrl } from "./url";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "bamboo.listBuildPlans",
        listBuildPlans
    );

    context.subscriptions.push(disposable);
}

async function listBuildPlans() {
    const config: {
        server: { uri: string };
    } = JSON.parse(JSON.stringify(vscode.workspace.getConfiguration("bamboo")));
    const searchTerm = getSearchTermFromWindow();
    if (!searchTerm) return;
    try {
        const allPlans = findAllPlans(searchTerm, config.server.uri);
        const picked = await showPanelWithPlans(allPlans);
        if (picked)
            openBrowserToPlan(picked.raw.searchEntity.id, config.server.uri);
    } catch (e) {
        console.error(e);
    }
}

function openBrowserToPlan(id: string, server: string) {
    vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse(getBrowsePlanUrl(id, server))
    );
}

async function showPanelWithPlans(plans: Promise<IPlan[]>) {
    const quickPickItems = plans.then(all =>
        all.map(p => ({
            label: p.searchEntity.planName,
            description: `${p.searchEntity.projectName} - [${
                p.searchEntity.branchName
            }]`,
            raw: p,
            picked: false
        }))
    );
    return vscode.window.showQuickPick(quickPickItems, {
        canPickMany: false,
        matchOnDescription: true
    });
}

function getSearchTermFromWindow() {
    const folders = vscode.workspace.workspaceFolders;
    let name = folders && folders.length > 0 ? folders[0].name : "";
    name = name || "";
    const quoted = `"${name.split("-").join(" ")}"`;
    return quoted;
}

export function deactivate() {}
